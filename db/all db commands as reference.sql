
--Create a stack
insert into stacks
(stack_title, user_id)
VALUES
('My Second Stack', 1)
returning *;

--Create quiz questions
insert into quizes 
(user_id, question, correct_answer, false_1, false_2, false_3)
VALUES 
(1, 'Is the world flat?', 'No', 'Yes', null, null)
returning *;

--User these to know what values to use in the next insert into stack_content
SELECT * from stacks
SELECT * from quizes 

--This is needed to assign the quizes to specific stacks
insert into stack_content (stack_id,quiz_id,user_id)
VALUES (5,5,1)
returning *;

-- The following query will select all stacks and their content from a specific user
select * from stacks
join quizes
on stacks.user_id = quizes.user_id 
where stacks.user_id = 1


-- Extra Shit --------------------
create TABLE stacks(
    stack_id serial primary key,
    stack_title text,
    user_id INTEGER REFERENCES users(user_id)
)

CREATE TABLE quizes(
    quiz_id serial primary key,
    user_id INTEGER REFERENCES users(user_id),
    question text,
    correct_answer text,
    false_1 text,
    false_2 text,
    false_3 text
)

CREATE TABLE broadcast(
    broadcast_id serial primary key,
    user_id INTEGER REFERENCES users(user_id),
    stack_id INTEGER REFERENCES stacks(stack_id),
    broadcast_code text,
    broadcast_start_time INTEGER,
    broadcast_end_time INTEGER
)


select * from quizes 
join stacks
on quizes.user_id = stacks.user_id
where stack_id = 4

CREATE TABLE stack_content(
    content_id serial primary key,
    ordinal_val INTEGER,
    stack_id INTEGER REFERENCES stacks(stack_id),
    quiz_id INTEGER REFERENCES quizes(quiz_id),
    user_id INTEGER REFERENCES users(user_id)
)
