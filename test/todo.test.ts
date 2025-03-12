import request from "supertest";
import app from "../src/server";

describe("API Endpoints Tests", (): void => {
  describe("GET ROUTES", (): void => {
    test("GET route for all courses", async (): Promise<void> => {
      const res = await request(app).get("/courses/");

      expect(res.body.docs.length).toEqual(3);
    });
  });
});
