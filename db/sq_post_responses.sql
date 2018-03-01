insert into responses
(user_session_id, selected_answer, selected_answer_text, response_timestamp, screen_name, broadcast_id, quiz_id)
VALUES
($1, $2, $3, $4, $5, $6, $7)
returning *;

