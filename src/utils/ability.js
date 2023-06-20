import { AbilityBuilder, createMongoAbility } from "@casl/ability";

// Define role constants
const ROLES = {
  RESIDENT: "resident",
  WORKER: "worker",
};

// Define workerType constants
const WORKER_TYPES = {
  PROPERTY_MANAGER: "propertyManager",
  CONCIERGE: "concierge",
  SECURITY: "security",
  JANITOR: "janitor",
  MAINTENANCE: "maintenance",
};

// Define actions constants
const ACTIONS = {
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  DELETE: "delete",
  MANAGE: "manage",
};

export function defineAbilitiesFor(user) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
  //Check login
  can(ACTIONS.READ, "Auth");
  if (!user) {
    defineAbilitiesForGuest(can);
  }

  if (user && user.role === ROLES.RESIDENT) {
    defineAbilitiesForResident(can, user);
  } else if (user && user.role === ROLES.WORKER) {
    defineAbilitiesForWorker(can, user);
  }

  return build();
}

// Define abilities for guest user
function defineAbilitiesForGuest(can) {
  can(ACTIONS.READ, "Building", ["name", "address"]);
  can(ACTIONS.READ, "Plan", ["-createdAt", "-updatedAt", "-__v"]);
  can(ACTIONS.READ, "RecidentialUnit", ["unitNumber"]);
}

// Define abilities for resident user
function defineAbilitiesForResident(can, user) {
  can(ACTIONS.READ, "Building");
  can([ACTIONS.UPDATE, ACTIONS.DELETE, ACTIONS.READ], "User", {
    _id: user._id,
  });
  can(ACTIONS.READ, "RecidentialUnit", {
    owners: { $in: [user._id] },
  });
}

// Define abilities for worker user
function defineAbilitiesForWorker(can, user) {
  switch (user.workerType) {
    case WORKER_TYPES.PROPERTY_MANAGER:
      can(ACTIONS.MANAGE, "RecidentialUnit", {
        building: { $in: user.buildings },
      });
      can(ACTIONS.MANAGE, "Building", {
        _id: { $in: user.buildings },
      });
      break;
    case WORKER_TYPES.CONCIERGE:
      can(ACTIONS.READ, "User", {
        "addresses.building": user.building,
      });
      can(ACTIONS.CREATE, "Guest", {
        "visitHistory.building": user.building,
      });
      can([ACTIONS.READ, ACTIONS.CREATE], "Notification", {
        building: user.building,
      });
      break;
    case WORKER_TYPES.SECURITY:
      can(ACTIONS.READ, "ParkingSpot", { building: user.building });
      can(ACTIONS.READ, "Guest", {
        "visitHistory.building": user.building,
      });
      break;
    case WORKER_TYPES.JANITOR:
    case WORKER_TYPES.MAINTENANCE:
      can([ACTIONS.READ, ACTIONS.UPDATE], "MaintenanceRequest", {
        building: user.building,
      });
      break;
    default:
      // Handle missing or unknown workerType
      console.error(`Unknown workerType: ${user.workerType}`);
  }
}
