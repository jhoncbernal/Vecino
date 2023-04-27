const { AbilityBuilder, Ability } = require("@casl/ability");

function defineAbilitiesFor(user) {
  const { can, build } = new AbilityBuilder(Ability);

  if (user && user.role) {
    if (user.role === "owner") {
      can("manage", "all");
    } else if (user.role === "tenant") {
      can("read", "Building");
      can("update", "User", { _id: user._id });
    } else if (user.role === "worker") {
      can("read", "Building");
      can("read", "User");
      if (user.workerType === "propertyManager") {
        can("manage", "Building");
        can("manage", "User");
      } else if (user.workerType === "concierge") {
        can("create", "Guest");
        can("read", "Notification");
      } else if (user.workerType === "security") {
        can("read", "ParkingSpot");
        can("read", "Guest");
      } else if (
        user.workerType === "janitor" ||
        user.workerType === "maintenance"
      ) {
        can("read", "MaintenanceRequest");
        can("update", "MaintenanceRequest");
      }
      // Add more permissions depending on the worker type
    }
  }

  return build();
}

module.exports = { defineAbilitiesFor };
