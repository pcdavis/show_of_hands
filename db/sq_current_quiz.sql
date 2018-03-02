insert into current_quiz
(quiz_id, question, correct_answer, false_1, false_2, false_3, broadcast_id )
VALUES
($1, $2, $3, $4, $5, $6, $7)
returning *;


   
         
         
          
              