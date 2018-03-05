insert into quizes 
(user_id, question, correct_answer, false_1, false_2, false_3)
VALUES 
($1, $2, $3, $4, $5, $6)
returning *;