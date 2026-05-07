// src/components/Footer.jsx
export default function Footer() {
    return (
      <footer id="contact" className="bg-zinc-100 px-4 py-12 text-zinc-600 dark:bg-black dark:text-zinc-400">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">Savi Foods</h3>
            <p>Osu, Accra, Ghana</p>
            <p className="mt-2">Open: Tue - Sun, 12pm - 11pm</p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-zinc-900 dark:text-white">Contact</h4>
            <p>+233 20 123 4567</p>
            <p>hello@savifoods.com</p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-zinc-900 dark:text-white">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-amber-500">Instagram</a>
              <a href="#" className="hover:text-amber-500">TikTok</a>
            </div>
          </div>
        </div>
        <p className="mt-12 text-center text-sm">© 2026 Savi Foods. All rights reserved.</p>
      </footer>
    );
  }