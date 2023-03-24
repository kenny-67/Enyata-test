export const mockUsers =
  process.env.NODE_ENV == "test"
    ? []
    : [
        {
          email: "john@example.com",
          firstName: "John",
          lastName: "Doh",
          password: "123456",
        },
        {
          email: "jane@example.com",
          firstName: "Jane",
          lastName: "Doh",
          password: "123456",
        },
      ];
