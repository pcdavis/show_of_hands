
--Create a stack
insert into stacks
(stack_title, user_id)
VALUES
('My Second Stack', 1)
returning *;

--create table responses



CREATE TABLE responses
(response_id serial primary key,
 userSessionID text,
 selectedAnswer text,
selectedAnswerText text,
response_timestamp INTEGER,
broadcast_id INTEGER REFERENCES broadcast(broadcast_id),
screen_name text,
user_id INTEGER REFERENCES users(user_id),
stack_id INTEGER REFERENCES stacks(stack_id) ,
quiz_id INTEGER REFERENCES quizes(quiz_id)
)

--Below are the three sql calls I use to create quizes and insert them into stacks that show up in my account for broadcasting
select * from quizes

insert into quizes 
(user_id, question, correct_answer, false_1, false_2, false_3)
VALUES 
(2, 'Which of these is NOT a character in Five Nights At Freddys?', 'Duxy the Duck', 'Freddy Fazbear', 'Bonnie the Bunny', 'Chica the Chicken')
returning *;

insert into stack_content (stack_id,quiz_id,user_id)
VALUES (65,51,2)
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

--fetch_broadcast_content--options----------------

SELECT * from quizes
join stack_content on quizes.quiz_id = stack_content.quiz_id
join broadcast on broadcast.stack_id = stack_content.stack_id
join stacks on stacks.stack_id = stack_content.stack_id
where broadcast.broadcast_id = $1

-- SELECT quizes.quiz_id, quizes.question, quizes.correct_answer, quizes.false_1, quizes.false_2, quizes.false_3, stack_content.stack_id, stacks.stack_title, broadcast.broadcast_id, broadcast.broadcast_code, broadcast.user_id
-- join stack_content on quizes.quiz_id = stack_content.quiz_id
-- join broadcast on broadcast.stack_id = stack_content.stack_id
-- join stacks on stacks.stack_id = stack_content.stack_id
-- where broadcast.broadcast_id = 1


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

CREATE TABLE broadcast(
    broadcast_id serial primary key,
    user_id INTEGER REFERENCES users(user_id),
    stack_id INTEGER REFERENCES stacks(stack_id),
    broadcast_code text,
    broadcast_start_time INTEGER,
    broadcast_end_time INTEGER
)

insert into broadcast 
(user_id,stack_id,broadcast_code)
VALUES 
(2, 1, 'xyz')
returning *;

select * from broadcast 
userSessionID,
        //     selectedAnswer,
        //     selectedAnswerText,
        //     response_timestamp,
        //     broadcast_id,
        //     screen_name,
        //     user_id,
        //     stack_id,
        //     quiz_id,
        //     question,
        //     correct_answer

CREATE TABLE responses(
    response_id serial primary key,
    user_session_id text,
    selected_answer text,
    selected_answer_text text,
    response_timestamp BIGINT,
    screen_name text,
    broadcast_id INTEGER REFERENCES broadcast(broadcast_id),
    user_id INTEGER REFERENCES users(user_id),
    stack_id INTEGER REFERENCES stacks(stack_id),
    quiz_id INTEGER REFERENCES quizes(quiz_id)    
)

insert into broadcast
(user_id,stack_id,broadcast_code)
VALUES
(2,1,'xyz')
returning *;









