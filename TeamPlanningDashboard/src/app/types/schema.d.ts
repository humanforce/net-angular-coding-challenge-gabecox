/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/Calendar": {
    get: {
      parameters: {
        query?: {
          country?: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["CalendarEventModel"][];
            "application/json": components["schemas"]["CalendarEventModel"][];
            "text/json": components["schemas"]["CalendarEventModel"][];
          };
        };
      };
    };
  };
  "/Sprint": {
    get: {
      parameters: {
        query?: {
          sprintId?: number;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["SprintModel"][];
            "application/json": components["schemas"]["SprintModel"][];
            "text/json": components["schemas"]["SprintModel"][];
          };
        };
      };
    };
  };
  "/Tickets": {
    get: {
      parameters: {
        query?: {
          sprintId?: number;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["TicketModel"][];
            "application/json": components["schemas"]["TicketModel"][];
            "text/json": components["schemas"]["TicketModel"][];
          };
        };
      };
    };
  };
  "/Velocity": {
    get: {
      parameters: {
        query?: {
          sprintId?: number;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["SprintVelocityModel"][];
            "application/json": components["schemas"]["SprintVelocityModel"][];
            "text/json": components["schemas"]["SprintVelocityModel"][];
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    CalendarEventModel: {
      id?: string | null;
      summary?: string | null;
      start?: components["schemas"]["EventDate"];
      end?: components["schemas"]["EventDate"];
      country?: string | null;
    };
    EventDate: {
      date?: string | null;
    };
    FieldsModel: {
      sprints?: components["schemas"]["SprintModel"][] | null;
      /** Format: double */
      storyPoints?: number;
    };
    SprintModel: {
      /** Format: int32 */
      id?: number;
      name?: string | null;
      /** Format: date-time */
      startDate?: string;
      /** Format: date-time */
      endDate?: string;
      /** Format: double */
      capacity?: number;
    };
    SprintVelocityModel: {
      /** Format: int32 */
      sprintId?: number;
      /** Format: double */
      velocity?: number;
    };
    TicketModel: {
      /** Format: int32 */
      id?: number;
      key?: string | null;
      fields?: components["schemas"]["FieldsModel"];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
