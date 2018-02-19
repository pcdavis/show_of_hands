insert into broadcast
(user_id,stack_id,broadcast_code)
VALUES
($1, $2, $3)
returning *;


