select * from quizes
join stack_content
on quizes.quiz_id = stack_content.quiz_id
where stack_id = 1;