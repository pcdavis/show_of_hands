SELECT * from quizes
join stack_content on quizes.quiz_id = stack_content.quiz_id
join broadcast on broadcast.stack_id = stack_content.stack_id
join stacks on stacks.stack_id = stack_content.stack_id
where broadcast.broadcast_id = $1