insert into t_user(id, email, first_name, last_name, password, account_non_expired, account_non_locked, credentials_not_expired, enabled) values(1, 'user@user.com', 'John', 'Smith', '$2a$04$o4k0H3vYDbXzWg8Yv3HIlO1gu2hERD6I3jkHkBcWmEF0SGLYfqNdy', true, true, true, true);

insert into t_privilege (id, name) values (1, 'RIGHT_EDIT_USERS');
insert into t_privilege (id, name) values (2, 'RIGHT_ADD_USER');
insert into t_role (id, name, description) values(1, 'ROLE_ADMIN', 'Administrator');
insert into t_x_roles_privileges(role_id, privilege_id)  (select r.id, p.id from t_role r, t_privilege p where r.name='ROLE_ADMIN');
insert into t_x_users_roles(role_id, user_id) values  (1,1);


create table oauth_client_details (
  client_id VARCHAR(256) PRIMARY KEY,
  resource_ids VARCHAR(256),
  client_secret VARCHAR(256),
  scope VARCHAR(256),
  authorized_grant_types VARCHAR(256),
  web_server_redirect_uri VARCHAR(256),
  authorities VARCHAR(256),
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additional_information VARCHAR(4096),
  autoapprove VARCHAR(256)
);

create table oauth_client_token (
  token_id VARCHAR(256),
  token blob,
  authentication_id VARCHAR(256),
  user_name VARCHAR(256),
  client_id VARCHAR(256)
);

create table oauth_access_token (
  token_id VARCHAR(256),
  token blob,
  authentication_id VARCHAR(256),
  user_name VARCHAR(256),
  client_id VARCHAR(256),
  authentication blob,
  refresh_token VARCHAR(256)
);

create table oauth_refresh_token (
  token_id VARCHAR(256),
  token blob,
  authentication blob
);

create table oauth_code (
  code VARCHAR(256), authentication blob
);

create table oauth_approvals (
  userId VARCHAR(256),
  clientId VARCHAR(256),
  scope VARCHAR(256),
  status VARCHAR(10),
  expiresAt TIMESTAMP,
  lastModifiedAt TIMESTAMP
);