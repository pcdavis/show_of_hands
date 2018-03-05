insert into stack_content (stack_id,quiz_id,user_id)
VALUES ($1, $2, $3)
returning *;