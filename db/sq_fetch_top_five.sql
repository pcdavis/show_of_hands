select * from responses
where broadcast_id = $1 and quiz_id = $2 and selected_answer = 'correct_answer'
order by response_timestamp asc
limit 5;