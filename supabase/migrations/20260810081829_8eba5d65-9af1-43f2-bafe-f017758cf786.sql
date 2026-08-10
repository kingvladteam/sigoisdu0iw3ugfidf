CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE TABLE public.books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text,
  price text,
  price_value integer,
  short text,
  long_text text[],
  specs jsonb NOT NULL DEFAULT '[]'::jsonb,
  cover text,
  gallery text[],
  sort_order integer NOT NULL DEFAULT 0,
  hidden boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.books TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.books TO authenticated;
GRANT ALL ON public.books TO service_role;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Books are viewable by everyone"
ON public.books FOR SELECT
USING (true);

CREATE POLICY "Admins can insert books"
ON public.books FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update books"
ON public.books FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete books"
ON public.books FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER books_set_updated_at
BEFORE UPDATE ON public.books
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.books (slug, sort_order) VALUES
  ('ulamky', 10),
  ('smachnenka-abetka', 20),
  ('abetka-kartky', 30),
  ('na-ivana-kupala', 40),
  ('kozhnomu-svoi-zhnyva', 50);

CREATE POLICY "Book images are readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'book-images');

CREATE POLICY "Admins can upload book images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'book-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update book images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'book-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete book images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'book-images' AND public.has_role(auth.uid(), 'admin'));