function LitZabavyTeaser() {
  return (
    <section className="relative border-t border-border/60 bg-gradient-to-br from-card/40 via-background to-accent/5">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
              <img
                src={event1.url}
                alt="Літературні забави — авторський вечір"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 hidden h-32 w-32 items-center justify-center rounded-full border border-border bg-card p-3 shadow-xl md:flex">
              <img
                src={litzabavyLogo.url}
                alt="Логотип Літературних забав"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col items-end text-right">
            {/* Суперепграф у стилі першої секції */}
            <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-white">
              <span className="h-px w-10 bg-accent"></span>
              Авторський проєкт
              <span className="h-px w-10 bg-accent"></span>
            </p>

            {/* Заголовок у стилі Hero */}
            <h2 className="font-display text-[2.7rem] font-medium leading-[1.02] text-accent md:text-6xl">
              Літературні забави
            </h2>

            {/* Опис у стилі Hero */}
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/75">
              Мистецький проєкт, заснований у листопаді 2021 року. Майданчик для творчого
              авангарду України — авторів, музикантів, художників і всіх, хто живе сучасною
              культурою.
            </p>

            {/* Перелік з іконками, вирівняний праворуч */}
            <div className="mt-7 flex flex-col items-end gap-3 text-sm text-foreground/80">
              <p className="flex items-center gap-2">
                Понад 150 українських авторів
                <Sparkles className="h-4 w-4 text-accent" />
              </p>
              <p className="flex items-center gap-2">
                Щотижневі літературні вечори
                <BookHeart className="h-4 w-4 text-accent" />
              </p>
            </div>

            {/* Кнопка в стилі Hero */}
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="group bg-foreground text-background transition-all duration-300 hover:scale-105 hover:bg-foreground/90 hover:shadow-xl"
              >
                <Link to="/projects">
                  Дізнатися більше
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
