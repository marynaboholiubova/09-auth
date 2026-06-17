import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. Everything will Ukraine! Slava Ukraini!</p>

        <div className={css.wrap}>
          <p>Developer: Maryna Boholiubova</p>
          <p>
            Contact me:{' '}
            <a href="mailto:marinaboholiubova@gmail.com">marinaboholiubova@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

