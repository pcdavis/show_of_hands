select * from stacks
join quizes
on stacks.user_id = quizes.user_id 
where stacks.user_id = 1