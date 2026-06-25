Backend README

1) Copy `.env.example` to `.env` and set `SUPABASE_URL`, `SUPABASE_KEY`, and `JWT_SECRET`.
2) Ensure your Supabase project has the following tables (SQL samples below).
3) Install deps: npm install
4) Run seed data: npm run seed
5) Start server: npm run dev

API endpoints summary:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (protected)
- GET /api/announcements
- POST /api/applications (protected) form-data: programTitle, documents (PDFs)
- GET /api/applications/me (protected)
- Admin routes (prefix /api/admin) protected + admin role: students, applications, announcements CRUD, stats

Supabase table SQL samples (run in SQL editor):

-- users
create table if not exists users (
	id uuid primary key default gen_random_uuid(),
	name text,
	email text unique,
	password text,
	university text,
	course text,
	role text default 'student',
	created_at timestamptz default now()
);

-- announcements
create table if not exists announcements (
	id uuid primary key default gen_random_uuid(),
	title text,
	content text,
	date timestamptz default now()
);

-- applications
create table if not exists applications (
	id uuid primary key default gen_random_uuid(),
	student uuid references users(id),
	programTitle text,
	documents text[],
	status text default 'pending',
	appliedAt timestamptz default now()
);
