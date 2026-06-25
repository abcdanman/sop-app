-- Run this in Supabase SQL editor to create the necessary tables

create extension if not exists pgcrypto;

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

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text,
  content text,
  date timestamptz default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  student uuid references users(id) on delete cascade,
  programTitle text,
  documents text[],
  status text default 'pending',
  appliedAt timestamptz default now()
);
