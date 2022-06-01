drop table board;

--기본키, 작성자이름, 제목, 내용, 작성일, 조회수
create table board
(
    board_idx number(4) primary key,
    board_name varchar2(40),
    board_title varchar2(100),
    board_content varchar2(500),
    board_date date default sysdate,
    board_hit number(4) default 0
);

drop sequence board_seq;

create sequence board_seq;

insert into board (board_idx, board_name, board_title, board_content, board_date)
values (board_seq.nextval, '남가연', '글 제목1', '글 내용1',sysdate);
insert into board (board_idx, board_name, board_title, board_content, board_date)
values (board_seq.nextval, '심미진', '글 제목2', '글 내용2',sysdate);
insert into board (board_idx, board_name, board_title, board_content, board_date)
values (board_seq.nextval, '이경신', '글 제목3', '글 내용3',sysdate);
insert into board (board_idx, board_name, board_title, board_content, board_date)
values (board_seq.nextval, '이민석', '글 제목4', '글 내용4',sysdate);

select * from board;

--답장 만들기

drop table reply;

create table reply(
    reply_idx number(4) primary key,
    reply_name varchar2(40),
    reply_content varchar2(500),
    reply_date date default sysdate,
    reply_board_idx number(4)
);

drop sequence reply_board_seq;

create sequence reply_board_seq;

-- 아이디, 이름, 댓글, 날짜 ,몇번글에 대한 글

insert into reply(reply_idx, reply_name, reply_content, reply_date, reply_board_idx)
values(reply_board_seq.nextval, '이동호','댓글제목1',sysdate, 1);
insert into reply(reply_idx, reply_name, reply_content, reply_date, reply_board_idx)
values(reply_board_seq.nextval, '이채영','댓글제목2',sysdate, 2);
insert into reply(reply_idx, reply_name, reply_content, reply_date, reply_board_idx)
values(reply_board_seq.nextval, '송주현','댓글제목3',sysdate, 3);
insert into reply(reply_idx, reply_name, reply_content, reply_date, reply_board_idx)
values(reply_board_seq.nextval, '차수민','댓글제목1',sysdate, 4);

select * from reply;

commit;