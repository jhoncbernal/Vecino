const { HasPermissionMiddleware } = require("../../../src/middlewares");

describe("HasPermissionMiddleware middleware", () => {
  let mockRequest = "";
  let mockResponse = "";
  let mockNext = "";
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = (baseUrl, method, roles = []) => ({
      baseUrl,
      originalUrl: baseUrl,
      method,
      user: { roles },
    });

    mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };

    mockNext = jest.fn();
  });

  describe("Users resource", () => {
    it("should allow access to /user path with GET method for admin", () => {
      const req = mockRequest("/v1/api/user", "GET", [
        "ROLE_ADMINISTRATION_ACCESS",
      ]);
      const res = mockResponse();

      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should allow access to /user/:id path with GET method UUID for user", () => {
      const req = mockRequest(
        "/v1/api/user/693f68c8-df52-467d-9c6f-0d5a4f99f347",
        "GET",
        ["ROLE_USER_ACCESS"]
      );
      const res = mockResponse();

      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should allow access to /user/:id path with GET method Object Id for user", () => {
      const req = mockRequest(
        "/v1/api/user/83897093-b07d-4096-b8fd-c2eef64f93ec",
        "GET",
        ["ROLE_USER_ACCESS"]
      );
      const res = mockResponse();

      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should allow access to /user/:id path with GET method PIN for user", () => {
      const req = mockRequest("/v1/api/user/R1234", "GET", [
        "ROLE_USER_ACCESS",
      ]);
      const res = mockResponse();

      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should allow access to /user/:id path with GET method Code 5 digits for user", () => {
      const req = mockRequest("/v1/api/user/12345", "GET", [
        "ROLE_USER_ACCESS",
      ]);
      const res = mockResponse();

      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should deny access to /user/:id path with PUT method for provider", () => {
      const req = mockRequest("/v1/api/user/123", "PUT", [
        "ROLE_PROVIDER_ACCESS",
      ]);
      const res = mockResponse();

      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Access denied" });
    });

    it("should allow access to /user path with POST method for admin", () => {
      const req = mockRequest("/v1/api/user", "POST", [
        "ROLE_ADMINISTRATION_ACCESS",
      ]);
      const res = mockResponse();
      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should allow access to /user path with PUT method for admin", () => {
      const req = mockRequest("/v1/api/user", "PUT", [
        "ROLE_ADMINISTRATION_ACCESS",
      ]);
      const res = mockResponse();

      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should allow access to /user path with DELETE method for admin", () => {
      const req = mockRequest("/v1/api/user", "DELETE", [
        "ROLE_ADMINISTRATION_ACCESS",
      ]);
      const res = mockResponse();

      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should allow access to /user/:id path with GET method for admin", () => {
      const req = mockRequest("/v1/api/user/123456", "GET", [
        "ROLE_ADMINISTRATION_ACCESS",
      ]);
      const res = mockResponse();

      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("for securityGuard role", () => {
    it("should allow access to /security-guards path with GET method for security guard", () => {
      const req = mockRequest(
        "/v1/api/security-guard/83897093-b07d-4096-b8fd-c2eef64f93ec",
        "GET",
        ["ROLE_SECURITY_GUARDS_ACCESS"]
      );
      const res = mockResponse();
      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should allow access to /security-guards path with PUT method for security guard", () => {
      const req = mockRequest("/v1/api/package", "POST", [
        "ROLE_SECURITY_GUARDS_ACCESS",
      ]);
      const res = mockResponse();

      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it("should deny access to /security-guards path with POST method for security guard", () => {
      const req = mockRequest("/v1/api/security-guards", "POST", [
        "ROLE_SECURITY_GUARDS_ACCESS",
      ]);
      const res = mockResponse();

      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Access denied" });
    });

    it("should deny access to /admin path with PATCH method for security guard", () => {
      const req = mockRequest("/v1/api/admin", "PATCH", [
        "ROLE_SECURITY_GUARDS_ACCESS",
      ]);
      const res = mockResponse();

      HasPermissionMiddleware(req, res, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Access denied" });
    });
  });
});
