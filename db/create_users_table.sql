CREATE TABLE users(
    user_id serial primary key,
    user_name text,
    isTeacher BOOLEAN,
    isStudent BOOLEAN,
    permissions_level INTEGER,
    first_name text,
    last_name text,
    screen_name text,
    img text,
    auth_id text
)
