export default function Footer({ lang }) {
  return (
    <footer className="bg-neutral-950 border-t border-white/10 text-gray-400 w-full">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* TOP SECTION */}
        <div className="grid md:grid-cols-3 grid-cols-2 gap-12">

          {/* BRAND */}
          <div className="space-y-4">
            <img src="/logo.png" className="w-20 opacity-90" />
            <p className="text-sm text-gray-500 leading-relaxed">
              {lang
                ? "Mongolia’s premier stand-up comedy platform bringing unforgettable live performances."
                : "Монголын шилдэг stand-up comedy платформ."}
            </p>
          </div>

          {/* CONTACT */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">
              {lang ? "Contact" : "Холбоо барих"}
            </h3>

            <p className="text-sm">+976 69963388</p>

            <div className="space-y-2 text-sm">
              <p className="hover:text-white transition cursor-pointer">
                Facebook • @ComedyLab
              </p>
              <p className="hover:text-white transition cursor-pointer">
                Instagram • @comedylaboratory
              </p>
              <p className="hover:text-white transition cursor-pointer">
                comedylabmn@gmail.com
              </p>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">
              {lang ? "Location" : "Хаяг"}
            </h3>

            <p className="text-sm leading-relaxed text-gray-500">
              LIBERTY PUB<br />
              Чингисийн өргөн чөлөө<br />
              Их хуралдай төвийн 1 давхарт<br />
              Ulaanbaatar, Mongolia
            </p>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

          <p>© 2025 Comedy Lab. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <p className="hover:text-white transition cursor-pointer">
              {lang ? "Privacy Policy" : "Нууцлал"}
            </p>
            <p className="hover:text-white transition cursor-pointer">
              {lang ? "Terms" : "Үйлчилгээний нөхцөл"}
            </p>
          </div>

        </div>

      </div>
    </footer>
  )
}
