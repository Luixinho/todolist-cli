import { createConnection } from "typeorm";

export const connection = createConnection().then((connection) => connection)


