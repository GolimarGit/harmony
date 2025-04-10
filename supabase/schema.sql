-- Create tables for the todo app
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  due_date DATE,
  priority INTEGER,
  project_id UUID,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  color TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.labels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  color TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.task_labels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  label_id UUID REFERENCES public.labels(id) ON DELETE CASCADE
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_labels ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can only see their own tasks"
  ON public.tasks
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks"
  ON public.tasks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
  ON public.tasks
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
  ON public.tasks
  FOR DELETE
  USING (auth.uid() = user_id);

-- Similar policies for projects
CREATE POLICY "Users can only see their own projects"
  ON public.projects
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects"
  ON public.projects
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON public.projects
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON public.projects
  FOR DELETE
  USING (auth.uid() = user_id);

-- Similar policies for labels
CREATE POLICY "Users can only see their own labels"
  ON public.labels
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own labels"
  ON public.labels
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own labels"
  ON public.labels
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own labels"
  ON public.labels
  FOR DELETE
  USING (auth.uid() = user_id);

-- Task labels policies
CREATE POLICY "Users can see task labels for their tasks"
  ON public.task_labels
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tasks
      WHERE tasks.id = task_labels.task_id
      AND tasks.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert task labels for their tasks"
  ON public.task_labels
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tasks
      WHERE tasks.id = task_labels.task_id
      AND tasks.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete task labels for their tasks"
  ON public.task_labels
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.tasks
      WHERE tasks.id = task_labels.task_id
      AND tasks.user_id = auth.uid()
    )
  );
