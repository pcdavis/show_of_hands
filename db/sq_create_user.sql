insert into users 
(user_name, isTeacher, isStudent, permissions_level, first_name, last_name, screen_name, img, auth_id)
VALUES 
('', null, null, 1, '', '', '', '', $1)
returning *;


