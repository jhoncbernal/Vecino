// Define permissions, allowed actions, and their corresponding HTTP methods
const permissions = {
  ROLE_DELIVERY_ACCESS: {
    delivery: ["update", "read"],
    package: ["readAll"],
  },
  ROLE_SECURITY_GUARDS_ACCESS: {
    "security-guard": ["read"],
    package: ["readAll", "create", "read", "update"],
    user: ["readAll", "read"],
  },
  ROLE_SALES_ACCESS: {
    user: ["update", "read"],
    provider: ["update", "read"],
    delivery: ["update", "read"],
    "security-guard": ["readAll", "read"],
    admin: ["read", "readAll", "update", "create", "delete"],
    package: ["readAll"],
  },
  ROLE_PROVIDER_ACCESS: {
    provider: ["update", "read"],
    delivery: ["update", "read"],
    bill: ["readAll"],
  },
  ROLE_USER_ACCESS: {
    user: ["update", "read"],
    package: ["readAll", "read"],
    delivery: ["update", "read", "create"],
    bill: ["readAll", "read"],
  },
  ROLE_ADMINISTRATION_ACCESS: {
    user: ["create", "update", "delete", "readAll", "read"],
    "security-guard": ["create", "update", "delete", "readAll"],
    admin: ["read", "update"],
  },
};

const actionsToMethods = {
  create: "post",
  update: "patch",
  delete: "delete",
  read: "get",
  readAll: "getAll",
};

// Define the middleware function
export default function (req, res, next) {
  try {
    const { user } = req;
    const { roles } = user;

    // Get the requested path and method
    const path = req.baseUrl.split("/")[3];
    let method = req.method.toLowerCase();
    if (roles.includes("ROLE_OWNER_ACCESS")) return next();

    // Determine the action for GET requests based on the last part of the URL
    if (method === "get") {
      const lastPathPart = req.originalUrl.split("/").pop();
      const objectIdRegex = /^[a-f\d]{24}$/i;
      const uuidRegex =
        /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;
      const pinRegex = /^R\d{4}$/i;
      const isObjectId = objectIdRegex.test(lastPathPart);
      const isUuid = uuidRegex.test(lastPathPart);
      const isPin = pinRegex.test(lastPathPart);
      const isPackageNumber = !isNaN(lastPathPart) && lastPathPart?.length >= 5;
      if (isObjectId || isUuid || isPin || isPackageNumber) {
        method = "get";
      } else {
        method = "getAll";
      }
    }

    // Return 403 if no path or roles are present in the request
    if (!path || !roles) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Check if the user has permission to access the requested path
    let allowedActions = [];
    for (const role of roles) {
      const rolePermissions = permissions[role];
      if (rolePermissions && rolePermissions[path]) {
        allowedActions = allowedActions.concat(rolePermissions[path]);
      }
    }
    if (allowedActions.length === 0) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Check if the user's role allows the requested method
    const allowedMethods = allowedActions.map((act) => actionsToMethods[act]);
    if (!allowedMethods.includes(method)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Call next middleware function if all checks pass
    return next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Access denied" });
  }
};
