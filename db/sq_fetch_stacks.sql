SELECT * from quizes
join stack_content on quizes.quiz_id = stack_content.quiz_id
join stacks on stacks.stack_id = stack_content.stack_id
where stack_content.user_id = $1;