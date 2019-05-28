
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
 
-- Created DATABASE named "viji_app"
-- Created all tables that i need
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (255) NOT NULL,
    "phonenumber" INT
);


CREATE TABLE "child" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "kid" VARCHAR (255) NOT NULL,
    "dob" DATE,
    "gender" VARCHAR (100) NOT NULL
);

CREATE TABLE "event" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "eventname" VARCHAR (255) NOT NULL,
    "date" DATE,
    "place" VARCHAR (100) NOT NULL,
    "contact_info" VARCHAR (255) ,
    "comments" VARCHAR (255) 
);

CREATE TABLE "user_child_event" (
     "id" SERIAL PRIMARY KEY,
     "event_id" INT REFERENCES "event",
     "child_id" INT REFERENCES "child",
     "status" VARCHAR (100) NOT NULL
);

CREATE TABLE "user_child_message" (
     "id" SERIAL PRIMARY KEY,
     "user_id" INT REFERENCES "user",
     "event_id" INT REFERENCES "event",
     "message" VARCHAR (255) NOT NULL
);
