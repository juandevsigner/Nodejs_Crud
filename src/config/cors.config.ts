import { ORIGIN } from "./config";

export const corsConfig = {
  allowedHeaders: "*",
  methods: "GET, POST, PUT, DELETE",
  preflightContinue: false,
  origin: ORIGIN,
};
