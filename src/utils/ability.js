import { AbilityBuilder, createMongoAbility } from "@casl/ability";
export function defineAbilitiesFor(user) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
  if (!user) {
    can("read", "Building", { $project: { name: 1 , address:1} });
    can("read", "Plan", {
      $project: { createdAt: 0, updatedAt: 0, __v: 0 },
    });
    can("read", "RecidentialUnit", { $project: { unitNumber: 1 } });
  }
  if (user && user.role) {
    if (user.role === "resident") {
      /*       const ownerUnitTypes = user.addresses
      .filter((address) => address.userType === "owner")
      .map((address) => address.unitType);

    can(["create", "update", "delete"], "User", {
      $or: user.addresses.map((address) => ({
        addresses: {
          $elemMatch: {
            userType: "tenant",
            unitType: { $in: ownerUnitTypes },
            _id: address._id,
            unitResidents: { $in: ["$._id"] },
          },
        },
      })), 
    });*/
      can("read", "Building", { $project: { _id: 0 } });
      can(["update", "delete", "read"], "User", { $match: { _id: user._id } });
    } else if (user.role === "worker") {
      switch (user.workerType) {
        case "propertyManager":
          // Define abilities for propertyManager role
          can("manage", "User", {
            addresses: { $elemMatch: { building: worker.building } },
          });
          can("manage", "Building", {
            addresses: { $elemMatch: { building: worker.building } },
          });
          break;

        case "concierge":
          // Define abilities for concierge role
          can("read", "User", {
            addresses: { $elemMatch: { building: worker.building } },
          });
          can("create", "Guest", {
            visitHistory: { $elemMatch: { building: worker.building } },
          });
          can(["read", "create"], "Notification", {
            building: worker.building,
          });
          break;

        case "security":
          // Define abilities for security role
          can("read", "ParkingSpot", {
            building: worker.building,
          });
          can("read", "Guest", {
            visitHistory: { $elemMatch: { building: worker.building } },
          });
          break;

        // ... add other workerType cases as needed
        case "janitor" || "maintenance":
          can(["read", "update"], "MaintenanceRequest", {
            building: worker.building,
          });
        default:
          break;
      }
      // Add more permissions depending on the worker type
    }
  }

  return build();
}
