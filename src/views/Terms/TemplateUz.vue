<template>
  <v-container v-resize="onResize">
    <v-row class="mx-6 my-8 text-center" justify="center">
      <div :class="(isSmallScreen ? 'text-h5' : 'text-h4') + ' font-weight-medium'" style="color: #2e74b5">
        "Hayot xaritasi" xizmatidan foydalanish shartlari
      </div>
    </v-row>
    <v-row class="mx-6 my-8 pb-12 text-justify" justify="center">
      <v-col cols="12" lg="8" md="10" sm="10">
        <p>
          "Hayot xaritasi" - bu pandemiya va karantin cheklovlarining salbiy ta'sirini kamaytirish uchun yaratilgan
          jamoat geografik axborot portali (keyingi o'rinlarda Portal deb yuritiladi). Har kim portalda yordamga muhtoj
          bo'lgan ma'lumotlarni joylashtirishi mumkin. Shu bilan birga, yordam berishga tayyor bo'lganlarning
          hammasi, masalan, ko'ngillilar, reklama joylashtirishlari va joylashuvlarini ko'rsatishlari mumkin. Portalga
          yuborilgan e'lonlar oldindan moderatsiya qilinadi.
        </p>
        <p>
          Portal ma'muriyati sizga "Hayot kartasi" portalidan foydalanish huquqini va ushbu Qoidalarning mavzusi bo'lgan
          shartlarda ishlashini ta'minlaydi. Shu munosabat bilan, ushbu Qoidalarning O'zbekiston Respublikasi
          qonunchiligiga (bundan buyon matnda qonun deb yuritiladi) muvofiq, ommaviy ma'muriyat tomonidan ommaviy oferta
          sifatida ko'rib chiqiladigan shartlarini diqqat bilan o'qib chiqishingiz kerak.
        </p>
      </v-col>
      <v-col cols="12" lg="8" md="10" sm="10">
        <div :class="(isSmallScreen ? 'text-h6' : 'text-h5') + ' font-weight-bold pb-2-'" style="color: #2e74b5">
          1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Umumiy holat
        </div>
        <ul class="my-2 mx-6">
          <li class="mb-2">
            "Hayot kartasi" portalidan foydalanishning ushbu shartlari (keyingi o'rinlarda Qoidalar deb ataladi)
            Portaldan
            foydalanish va uni rivojlantirish shartlarini, shuningdek foydalanuvchilar va Ma'muriyatning huquq va
            majburiyatlarini belgilaydi. Qoidalar, shuningdek, Portal foydalanuvchilari bo'lmagan, lekin
            foydalanuvchilarning
            xatti-harakatlari natijasida huquqlari va manfaatlariga ta'sir ko'rsatadigan uchinchi shaxslarning huquqlari
            va
            manfaatlariga tegishli munosabatlarga nisbatan ham qo'llaniladi.
          </li>
          <li class="mb-2">
            Foydalanuvchi Portalda ro'yxatdan o'tishdan oldin ushbu Qoidalar bilan to'liq tanishib chiqishi shart.
            Foydalanuvchini Portalda ro'yxatdan o'tkazish qonun hujjatlariga muvofiq ushbu Qoidalarning to'liq va
            so'zsiz qabul
            qilinishini anglatadi.
          </li>
          <li class="mb-2">
            Ushbu qoidalar Portal ma'muriyati tomonidan biron bir maxsus ogohlantirishsiz bir tomonlama tartibda
            o'zgartirilishi va/yoki to'ldirilishi mumkin. Qoidalarning joriy talqini Internetda joylashgan: <a
                  href="https://lifemap.uz/terms" target="_blank">https://lifemap.uz/terms</a>.
            Portal ma'muriyati foydalanuvchilarga ushbu Qoidalarning shartlarini o'zgartirishlar va / yoki qo'shimchalar
            kiritish uchun doimiy ravishda tekshirib turishni tavsiya qiladi. Foydalanuvchi tomonidan ushbu Qoidalarga
            o'zgartishlar va / yoki qo'shimchalar kiritilgandan so'ng, portaldan doimiy ravishda foydalanish, bunday
            o'zgartirishlar va / yoki qo'shimchalar bilan Foydalanuvchi tomonidan qabul qilinishi va roziligini
            anglatadi.

          </li>
          <li class="mb-2">
            Ushbu Qoidalar va uning faoliyatining barcha masalalari yuzasidan Portal ma'muriyatiga murojaat, taklif va
            shikoyatlarni
            <a href="https://t.me/lifemapuz" target="_blank">@lifemapuz </a>
            <!--            <a href="https://telegram.org/" target="_blank">Telegram</a>-->
            Telegram manziliga yuborish mumkin.
          </li>
        </ul>
      </v-col>
      <v-col cols="12" md="8" sm="12">
        <div :class="(isSmallScreen ? 'text-h6' : 'text-h5') + ' font-weight-bold pb-2-'" style="color: #2e74b5">
          2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Portalda ro'yxatdan o'tish va
          foydalanuvchi holati
        </div>
        <ul class="my-2 mx-6">

          <li class="mb-2">
            Foydalanuvchini Portalda ro'yxatdan o'tkazish bepul, ixtiyoriy va u
            <a href="https://telegram.org/" target="_blank">Telegram</a> dasturi orqali amalga oshiriladi. Telegram
            dasturi orqali portalda ro'yxatdan o'tish va / yoki avtorizatsiya qilish Qoidalarni qabul
            qilishni anglatadi.
          </li>
          <li class="mb-2">
            Portal foydalanuvchisi - ushbu Qoidalarda belgilangan tartibda Portalda ro'yxatdan o'tgan, ushbu Qoidalarni
            qabul
            qilish uchun qonun hujjatlariga muvofiq yo'l qo'yiladigan yoshga etgan va tegishli vakolatlarga ega bo'lgan
            shaxs
            (bundan buyon matnda foydalanuvchi deb yuritiladi).
          </li>
          <li class="mb-2">
            Portalda ro'yxatdan o'tishda foydalanuvchi Portal ma'muriyatini zarur ishonchli va joriy ma'lumot bilan
            ta'minlashi shart. Foydalanuvchi ro'yxatga olish paytida taqdim etilgan ma'lumotlarning aniqligi,
            dolzarbligi,
            to'liqligi va qonun hujjatlariga muvofiqligi va uning uchinchi tomon da'volaridan tozaligi uchun
            javobgardir.
          </li>
          <li class="mb-2">
            Ro'yxatdan o'tayotganda, foydalanuvchi: ushbu Qoidalarga rozi bo'ladi va ularda Portaldan foydalanish va
            ishlash
            bilan bog'liq huquq va majburiyatlarni oladi; Shaxsiy ma'lumotlar to'g'risidagi qonun hujjatlarining
            qoidalariga
            muvofiq ushbu Qoidalarga rioya qilish uchun Portal ma'muriyatiga uning shaxsiy ma'lumotlarini qayta
            ishlashga
            rozilik beradi. Foydalanuvchi Portalda muvaffaqiyatli ro'yxatdan o'tkazilgandan so'ng, Ma'muriyat ushbu
            Qoidalarda
            ko'rsatilgan foydalanuvchiga nisbatan huquq va majburiyatlarni o'z zimmasiga oladi.
          </li>
          <li class="mb-2">
            Foydalanuvchi shaxsiy ma'lumotlarini qayta ishlash qonun hujjatlariga muvofiq amalga oshiriladi. Portal
            ma'muriyati foydalanuvchiga Portalning funktsional imkoniyatlaridan foydalanishni, shu jumladan
            Foydalanuvchi
            tomonidan maqsadli reklama olish maqsadida foydalanishni ta'minlash uchun foydalanuvchining shaxsiy
            ma'lumotlarini
            qayta ishlaydi; portalning funktsional imkoniyatlari va bo'limlarini saqlash va yaxshilash, shuningdek,
            yangi
            funktsional imkoniyatlar va Portal bo'limlarini rivojlantirishga imkon beradigan bunday ma'lumotlarni
            tekshirish,
            tadqiq qilish va tahlil qilish. Portal ma'muriyati foydalanuvchining shaxsiy ma'lumotlarini ruxsatsiz
            kirish,
            o'zgartirish, oshkor qilish yoki yo'q qilishdan himoya qilish uchun barcha choralarni ko'radi. Ma'muriyat
            foydalanuvchining shaxsiy ma'lumotlariga faqat ma'muriyat xodimlariga, pudratchilarga va agentlarga kirish
            huquqini
            beradi, Portalning ishlashini ta'minlash va foydalanuvchiga undan foydalanishni ta'minlash uchun ushbu
            ma'lumotlarga
            muhtoj bo'lganlar. Portal ma'muriyati amaldagi qonun hujjatlari talablariga muvofiqligini ta'minlash,
            foydalanuvchilar, portal ma'muriyati, uchinchi shaxslarning huquqlarini va manfaatlarini himoya qilish
            maqsadida
            foydalanuvchi tomonidan taqdim etilgan ma'lumotlardan, shu jumladan shaxsiy ma'lumotlardan foydalanish,
            shuningdek
            ularni uchinchi shaxslarga uzatish huquqiga ega (shu jumladan aniqlash, tekshirish / noqonuniy harakatlarni
            tekshirish va / yoki bostirish). Foydalanuvchi tomonidan taqdim etilgan ma'lumotlarning oshkor etilishi
            faqat
            amaldagi qonun hujjatlariga muvofiq sud, huquqni muhofaza qiluvchi organlarning talabiga binoan, shuningdek
            qonunda
            nazarda tutilgan boshqa hollarda amalga oshirilishi mumkin. Portal ma'muriyati amaldagi qonun hujjatlari
            talablariga
            muvofiqligini ta'minlash, foydalanuvchilar, portal ma'muriyati, uchinchi shaxslarning huquqlarini va
            manfaatlarini
            himoya qilish maqsadida foydalanuvchi tomonidan taqdim etilgan ma'lumotlardan, shu jumladan shaxsiy
            ma'lumotlardan
            foydalanish, shuningdek ularni uchinchi shaxslarga uzatish huquqiga ega (shu jumladan aniqlash, tekshirish /
            noqonuniy harakatlarni tekshirish va / yoki bostirish). Foydalanuvchi tomonidan taqdim etilgan
            ma'lumotlarning
            oshkor etilishi faqat amaldagi qonun hujjatlariga muvofiq sud, huquqni muhofaza qiluvchi organlarning
            talabiga
            binoan, shuningdek qonunda nazarda tutilgan boshqa hollarda amalga oshirilishi mumkin. Portal ma'muriyati
            amaldagi
            qonun hujjatlari talablariga muvofiqligini ta'minlash, foydalanuvchilar, portal ma'muriyati, uchinchi
            shaxslarning
            huquqlarini va manfaatlarini himoya qilish maqsadida foydalanuvchi tomonidan taqdim etilgan ma'lumotlardan,
            shu
            jumladan shaxsiy ma'lumotlardan foydalanish, shuningdek ularni uchinchi shaxslarga uzatish huquqiga ega (shu
            jumladan aniqlash, tekshirish / noqonuniy harakatlarni tekshirish va / yoki bostirish). Foydalanuvchi
            tomonidan
            taqdim etilgan ma'lumotlarning oshkor etilishi faqat amaldagi qonun hujjatlariga muvofiq sud, huquqni
            muhofaza
            qiluvchi organlarning talabiga binoan, shuningdek qonunda nazarda tutilgan boshqa hollarda amalga
            oshirilishi
            mumkin. Portal ma'muriyati, uchinchi shaxslar (shu jumladan noqonuniy xatti-harakatlarni aniqlash,
            tekshirish /
            tekshirish va / yoki oldini olish uchun). Foydalanuvchi tomonidan taqdim etilgan ma'lumotlarning oshkor
            etilishi
            faqat amaldagi qonun hujjatlariga muvofiq sud, huquqni muhofaza qiluvchi organlarning talabiga binoan,
            shuningdek
            qonunda nazarda tutilgan boshqa hollarda amalga oshirilishi mumkin. Portal ma'muriyati, uchinchi shaxslar
            (shu
            jumladan noqonuniy xatti-harakatlarni aniqlash, tekshirish / tekshirish va / yoki oldini olish uchun).
            Foydalanuvchi
            tomonidan taqdim etilgan ma'lumotlarning oshkor etilishi faqat amaldagi qonun hujjatlariga muvofiq sud,
            huquqni
            muhofaza qiluvchi organlarning talabiga binoan, shuningdek qonunda nazarda tutilgan boshqa hollarda amalga
            oshirilishi mumkin.
          </li>
          <li class="mb-2">
            Foydalanuvchi Portal xizmatlari va / yoki uchinchi tomon xizmatlari orqali elektron xabarlar, SMS va boshqa
            turdagi xabarlarni qabul qilishga rozi bo'ladi. reklama va axborot tarkibi, shu jumladan portal sheriklari
            tomonidan.
          </li>
          <li class="mb-2">
            Foydalanuvchi ro'yxatga olish ma'lumotlarini uchinchi shaxslarga topshirish huquqiga ega emas, ularning
            saqlanish
            usulini mustaqil tanlab, ularning saqlanishi uchun to'liq javobgar bo'ladi. Foydalanuvchi o'zi tomonidan
            ishlatiladigan apparat va dasturiy ta'minotda login va parolni saqlashga (cookie-fayllardan foydalanib)
            Portalda
            avtomatik avtorizatsiya qilish uchun ruxsat berishi mumkin.
          </li>
          <li class="mb-2">
            Agar Foydalanuvchi boshqacha isbot qilmasa, uning ro'yxatdan o'tgan ma'lumotlari yordamida qilingan
            harakatlar
            tegishli foydalanuvchi tomonidan qilingan deb hisoblanadi. Agar foydalanuvchining ro'yxatga olish
            ma'lumotlari
            ostida Portalga ruxsatsiz kirish imkoniyati bo'lsa, u zudlik bilan Portal ma'muriyatini xabardor qilishi
            shart.
          </li>
          <li class="mb-2">
            Foydalanuvchi amaldagi qonun hujjatlariga, xalqaro-huquqiy hujjatlarga va ushbu Qoidalarga muvofiq Portalda
            ma'lumotlarni yaratish va joylashtirish bilan bog'liq xatti-harakatlari uchun to'liq javobgar bo'ladi.
          </li>



          <li class="mb-2">
            Uchinchi shaxslarning qonuniy huquqlari va manfaatlarini, amaldagi qonunchilikni, shuningdek ushbu Qoidalarning
            qoidalarini buzganlik holati aniqlangan taqdirda, Portal ma'muriyati o'z tanlovi bo'yicha quyidagi tadbirlarni
            amalga oshirishga haqlidir, alohida-alohida va kerak bo'lganda portal ma'muriyatining siyosatiga muvofiq va
            tabiatiga qarab. Hamjamiyatda tegishli qoidabuzarliklarning chastotasi:
            <ul class="my-2 mx-6">
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                Foydalanuvchi tomonidan Portalda joylashtirilgan tarkib va boshqa ma'lumotlarni o'chirish va / yoki unga kirishni
                blokirovka qilish;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                ma'lum foydalanuvchilarning Portalga kirishini blokirovka qilish;</li>
            </ul>
          </li>
        </ul>
      </v-col>
      <v-col cols="12" md="8" sm="12">
        <div :class="(isSmallScreen ? 'text-h6' : 'text-h5') + ' font-weight-bold pb-2-'" style="color: #2e74b5">
          3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Foydalanuvchi majburiyatlari
        </div>
        <ul class="my-2 mx-6">
          <li class="mb-2">
            Portaldan foydalanganda, foydalanuvchi:
            <ul class="my-2 mx-6">
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                amaldagi qonun hujjatlari, xalqaro-huquqiy hujjatlar va ushbu Qoidalarga rioya qilish;</li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                ro'yxatga olish paytida ishonchli, to'liq va dolzarb ma'lumotlarni taqdim etadi, ularning yangilanishini
                kuzatadi;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                foydalanuvchini ro'yxatdan o'tkazish ma'lumotlari ostida Portalga ruxsatsiz kirish to'g'risida portal
                ma'muriyatini xabardor qilish;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                boshqa foydalanuvchilarga o'zlarining ro'yxatdan o'tish ma'lumotlari bo'yicha portalga kirish huquqini taqdim
                etmaslik, agar bu qonun va / yoki ushbu Qoidalarning buzilishiga olib kelishi mumkin bo'lsa;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                boshqalarning huquqlari va manfaatlarini buzishi mumkin bo'lgan ma'lumotlar va ob'ektlarni (shu jumladan, ularga
                havolalarni) portalga joylashtirmaslik;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                joylashtirishning qonuniyligini oldindan baholash uchun ma'lumotlar va ob'ektlarni (shu jumladan, lekin shu bilan
                cheklanmagan holda, boshqa shaxslarning suratlari, boshqa odamlarning turli xil tarkibidagi matnlar, audio yozuvlar
                va videolarni) joylashtirishdan oldin;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                sir saqlang va boshqa foydalanuvchilar va uchinchi shaxslarga boshqa foydalanuvchilar bilan aloqa natijasida va
                Portaldan boshqa foydalanish natijasida ma'lum bo'lgan shaxsiy ma'lumotlarini bermang (uy manzili, telefon
                raqamlari, elektron pochta manzillari, pasport ma'lumotlari, bank ma'lumotlari) va boshqa foydalanuvchilar va
                uchinchi shaxslarning tegishli ruxsatini olmasdan shaxsiy hayoti to'g'risidagi ma'lumotlar;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                Foydalanuvchi uchun muhim bo'lgan ma'lumotlarning zaxira nusxasini yaratish.</li>
            </ul>
          </li>
          <li class="mb-2">
            Agar biron-bir xatti-harakatlarning, shu jumladan ma'lumotlarni joylashtirish yoki kirishni ta'minlashning
            qonuniyligiga shubha tug'ilsa, portal ma'muriyati bunday harakatlardan bosh tortishni tavsiya qiladi.
          </li>
          <li class="mb-2">
            Portaldan foydalanishda foydalanuvchiga quyidagilar taqiqlanadi:
            <ul class="my-2 mx-6">

              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                foydalanuvchi nomidan yoki uning o'rniga foydalanuvchi sifatida ro'yxatdan o'tish ("qalbaki hisob") yoki
                foydalanuvchilar guruhini (birlashmasini) yoki yuridik shaxsni ro'yxatdan o'tkazish. Shu bilan birga, boshqa
                jismoniy yoki yuridik shaxs nomidan va nomidan ro'yxatdan o'tish, zarur vakolatlar qonunda nazarda tutilgan tartibda
                va shaklda olingan taqdirda amalga oshiriladi;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                boshqa ro'yxatdan o'tgan foydalanuvchini ro'yxatdan o'tkazish ma'lumotlaridan foydalangan holda foydalanuvchilarni
                identifikatorlari to'g'risida chalg'itadi;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                o'zingiz, yoshingiz yoki boshqa shaxslar yoki tashkilotlar bilan munosabatlaringiz haqidagi ma'lumotlarni buzib
                ko'rsatish;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                yuklash, saqlash, nashr etish, tarqatish va kirishni ta'minlash yoki quyidagilarga o'xshash har qanday
                ma'lumotlarni ishlatish:
              </li>
              <ul class="my-2 mx-6">
                <li class="mt-2" style="list-style-type: none; display: flex">
                  <i class="mdi mdi-check mx-2"></i>
                  tahdidlar, obro'sini yo'qotish, haqoratlash, sha'ni va qadr-qimmatini yoki ishchanlik obro'sini tahqirlash yoki
                  boshqa foydalanuvchilar yoki uchinchi shaxslarning shaxsiy hayotini buzish;
                </li>
                <li class="mt-2" style="list-style-type: none; display: flex">
                  <i class="mdi mdi-check mx-2"></i>
                  voyaga etmaganlarning huquqlarini buzadi;</li>
                <li class="mt-2" style="list-style-type: none; display: flex">
                  <i class="mdi mdi-check mx-2"></i>
                  qo'pol yoki odobsiz, pornografik tasvirlar va voyaga etmaganlar ishtirokidagi shahvoniy xarakterdagi matnlar yoki
                  sahnalarni o'z ichiga olgan;
                </li>
                <li class="mt-2" style="list-style-type: none; display: flex">
                  <i class="mdi mdi-check mx-2"></i>
                  hayvonlarga nisbatan g'ayriinsoniy munosabat sahnalari;</li>
                <li class="mt-2" style="list-style-type: none; display: flex">
                  <i class="mdi mdi-check mx-2"></i>
                  o'z joniga qasd qilish usullari va usullari, uni sodir etishga undovchi sabablar tavsifi;</li>
                <li class="mt-2" style="list-style-type: none; display: flex">
                  <i class="mdi mdi-check mx-2"></i>
                  irqiy, diniy, etnik nafratni yoki adovatni qo'zg'atishni targ'ib qiladi va / yoki targ'ib qiladi, fashizmni yoki
                  irqiy ustunlik mafkurasini targ'ib qiladi;
                </li>
                <li class="mt-2" style="list-style-type: none; display: flex">
                  <i class="mdi mdi-check mx-2"></i>
                  ekstremistik materiallarni o'z ichiga oladi;</li>
                <li class="mt-2" style="list-style-type: none; display: flex">
                  <i class="mdi mdi-check mx-2"></i>
                  jinoiy faoliyatni targ'ib qiladi yoki jinoiy harakatlarga oid ko'rsatmalar, ko'rsatmalar yoki ko'rsatmalar
                  mavjud;
                </li>
                <li class="mt-2" style="list-style-type: none; display: flex">
                  <i class="mdi mdi-check mx-2"></i>
                  davlat va tijorat sirlari, shuningdek, uchinchi shaxslarning shaxsiy hayoti to'g'risidagi ma'lumotlar, shu
                  jumladan cheklangan ma'lumotlarga ega bo'lish imkoniyati mavjud;
                </li>
                <li class="mt-2" style="list-style-type: none; display: flex">
                  <i class="mdi mdi-check mx-2"></i>
                  giyohvand moddalarni iste'mol qilishning jozibadorligini aks ettiruvchi reklama, jumladan "raqamli dorilar"
                  (binaural urish tufayli inson miyasiga ta'sir qiluvchi ovozli fayllar), dorilarning tarqalishi, ularni tayyorlash
                  bo'yicha retseptlar va ulardan foydalanish bo'yicha tavsiyalar;
                </li>
                <li class="mt-2" style="list-style-type: none; display: flex">
                  <i class="mdi mdi-check mx-2"></i>
                  foydalanuvchilarni chalg'itish yoki ularning ishonchini suiiste'mol qilish orqali noqonuniy xatti-harakatlarga
                  olib kelishi mumkin;
                </li>
                <li class="mt-2" style="list-style-type: none; display: flex">
                  <i class="mdi mdi-check mx-2"></i>
                  shuningdek fuqarolar va yuridik shaxslarning boshqa huquqlari va manfaatlarini yoki qonuniy talablarini buzadi.
                </li>
              </ul>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                foydalanuvchilar va uchinchi shaxslarning intellektual mulkini noqonuniy ravishda yuklash, saqlash, nashr etish,
                tarqatish va ularga kirish yoki boshqacha tarzda foydalanish;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                portalning boshqa foydalanuvchilariga ularning roziligisiz xabarlarni ommaviy yuborilishini amalga oshirish;</li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                dasturiy ta'minotdan foydalaning va Portalning yoki foydalanuvchilarning shaxsiy sahifalarining normal ishlashiga
                xalaqit beradigan harakatlarni amalga oshiring;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                viruslarni, troyanlarni va boshqa zararli dasturlarni yuklash, saqlash, nashr etish, tarqatish va ularga kirishni
                ta'minlash yoki boshqacha tarzda foydalanish;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                Portal ma'muriyatining maxsus ruxsatisiz Portalda ma'lumot to'plash va / yoki Portal va uning faoliyati bilan
                o'zaro bog'lanish uchun avtomatlashtirilgan skriptlardan (dasturlar, botlar, sudrab yuruvchilar) foydalanish;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                aldash, ishonchni suiiste'mol qilish, xakerlik yo'li bilan har qanday usulda, shu bilan cheklanib qolmasdan,
                boshqa foydalanuvchini ro'yxatga olish ma'lumotlaridan foydalanishga harakat qilish;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                boshqa shaxslarning shaxsiy ma'lumotlarini noqonuniy yig'ish va qayta ishlashni amalga oshirish;</li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                Portal ma'muriyati taqdim etgan interfeysdan tashqari boshqa har qanday usulda foydalanish, Ma'muriyat bilan
                alohida kelishuvga binoan foydalanuvchiga bunday harakatlar to'g'ridan-to'g'ri ruxsat etilgan hollar bundan
                mustasno;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                har qanday maqsadlar uchun Portaldan foydalanish, shu jumladan uning faollashtirilmagan ma'lumotlari va
                buyruqlarini takrorlash, ko'paytirish, nusxalash, sotish, savdo qilish va qayta sotish, ushbu Qoidalarga muvofiq
                foydalanuvchiga bunday harakatlar ruxsat etilgan hollar bundan mustasno. yoki ma'muriyat bilan alohida kelishuv;
              </li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                tijorat va siyosiy reklama tarqatish;</li>
              <li class="mt-2" style="list-style-type: none; display: flex">
                <i class="mdi mdi-minus mx-2"></i>
                Ma'muriyatning shaxsiy fikriga ko'ra, nomaqbul bo'lgan, Portalni yaratish maqsadlariga javob bermaydigan,
                foydalanuvchilarning manfaatlariga zid keladigan yoki boshqa sabablarga ko'ra Portalda joylashtirish uchun nomaqbul
                bo'lgan barcha ma'lumotlarni joylashtiring;
              </li>
            </ul>
          </li>
          <li class="mb-2">
            Foydalanuvchi o'z portalida joylashtirgan, boshqa foydalanuvchilarga etkazadigan har qanday ma'lumot uchun,
            shuningdek, boshqa foydalanuvchilar bilan o'zaro aloqalar uchun javobgar bo'ladi.
          </li>
          <li class="mb-2">
            Agar Foydalanuvchi ushbu Qoidalarga yoki ularning yangilanishlariga rozi bo'lmasa, foydalanuvchi belgilangan
            tartibda Portal ma'muriyatini xabardor qilib, Portaldan foydalanishni rad etishga majburdir.
          </li>
        </ul>
      </v-col>

      <v-col cols="12" md="8" sm="12">
        <div :class="(isSmallScreen ? 'text-h6' : 'text-h5') + ' font-weight-bold pb-2-'" style="color: #2e74b5">
          4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Intellektual huquqlar
        </div>
        <ul class="my-2 mx-6">
          <li class="mb-2">
            Portalda joylashtirilgan barcha ob'ektlar, shu jumladan dizayn elementlari, matn, grafika, rasmlar,
            videolar,
            skriptlar, dasturlar, musiqa, tovushlar va boshqa ob'ektlar va ularning to'plamlari (bundan keyin - Tarkib
            deb
            yuritiladi) ma'muriyat, Portal foydalanuvchilari va eksklyuziv huquqlariga ega. boshqa mualliflik huquqi
            egalari,
            ushbu ob'ektlarga bo'lgan barcha huquqlar himoyalangan.
          </li>
          <li class="mb-2">
            Ushbu Qoidalarda, shuningdek amaldagi qonun hujjatlarida belgilangan hollar bundan mustasno, biron-bir
            Tarkibdan
            nusxa ko'chirish (ko'paytirish), qayta ishlash, tarqatish, kadrda namoyish etish, nashr etish, yuklab olish,
            berish,
            sotish yoki boshqacha tarzda yoki qisman mualliflik huquqi egasining ruxsatisiz foydalanish mumkin emas,
            Mualliflik
            huquqi egasi har qanday shaxs tomonidan Kontentdan bepul foydalanishga o'z roziligini bildirmasa. Tarkibiy
            va / yoki
            notijorat maqsadlarda ma'lumotlar bazasini yaratish uchun va / yoki tarkibni to'liq yoki uning biron-bir
            qismida
            foydalanish uchun, foydalanish usulidan qat'i nazar, Ma'muriyatning roziligisiz, tarkibni ko'paytirish,
            nusxalash,
            to'plash, tizimlashtirish, saqlash, uzatish Ma'muriyatning roziligisiz yo'l qo'yilmaydi.
          </li>
          <li class="mb-2">
            O'ziga tegishli tarkibni Portalda joylashtirish orqali, foydalanuvchi boshqa foydalanuvchilarga faqat portal
            tomonidan taqdim etilgan funksiya doirasida foydalanishga, faqat shaxsiy notijorat maqsadlarida foydalanish,
            ko'rish, takrorlash (shu jumladan nusxalash) orqali boshqa mutlaq bo'lmagan huquqni beradi. bunday
            foydalanish
            mualliflik huquqi egasining qonun bilan himoya qilinadigan manfaatlariga olib keladigan yoki zarar etkazishi
            mumkin
            bo'lgan hollarda.
          </li>
          <li class="mb-2">
            Shaxsiy foydalanish uchun faqat shaxsiy notijoriy maqsadlarda foydalanish huquqiga ega bo'lgan Tarkibdan
            foydalanishga barcha mualliflik belgilari (mualliflik huquqlari) yoki boshqa mualliflik eslatmalari saqlanib
            qolingan, muallifning ismi o'zgartirilmagan va asar o'zgarmagan taqdirda foydalanish mumkin.
          </li>
          <li class="mb-2">
            Shuningdek, foydalanuvchi Portal ma'muriyatiga Portalda joylashtirilgan va unga qonuniy egalik qilingan
            tarkibdan
            bepul foydalanish huquqiga ega. Portal ma'muriyati Portalning funktsional imkoniyatlari va arxitekturasi
            tomonidan
            belgilanadigan darajada Portalni boshqarishini ta'minlash va Portal ma'muriyatining reklama materiallarida,
            shu
            jumladan uning ichida namoyish etishiga ishonch hosil qilish uchun. portal interfeysi tasvirlari, shu
            jumladan
            bunday reklama materiallarini ommaga etkazish orqali. Ushbu eksklyuziv huquq, Kontentni Portalga
            joylashtirish
            muddati davomida berilgan va o'z ta'sirini butun dunyo mamlakatlari hududida kengaytiradi. Kontentni
            portalga
            joylashtirish muddati va / yoki mutlaq bo'lmagan huquqning muddati tugashi, portal ma'muriyatining reklama
            materiallarini kontentni namoyish qilish bilan (shu jumladan ularni Internetdan olib tashlash) muomaladan
            chiqarish
            zaruriyatini keltirib chiqarmaydi. Portal ma'muriyati ushbu bo'limda ko'rsatilgan huquqlarni uchinchi
            shaxslarga
            topshirish huquqiga ega. Foydalanuvchi Ma'muriyat o'z tarkibiga o'z xohishiga ko'ra, shu jumladan reklama
            ma'lumotlarini aks ettirish uchun mo'ljallangan Foydalanuvchi tomonidan joylashtirilgan Tarkibni namoyish
            etilishini
            ta'minlab, portalning funktsional va texnik imkoniyatlaridan foydalanish huquqiga ega ekanligiga rozilik
            beradi.
          </li>
          <li class="mb-2">
            Agar Foydalanuvchi o'z tarkibini Portaldan olib tashlasa, yuqorida aytib o'tilgan eksklyuziv huquq avtomatik
            ravishda bekor qilinadi, ammo ma'muriyat, zarur bo'lsa, portalning texnik xususiyatlari tufayli, zarur
            bo'lgan vaqt
            ichida Foydalanuvchi tarkibining arxivlangan nusxalarini saqlash huquqini o'zida saqlab qoladi.
          </li>
          <li class="mb-2">
            O'zining tarkibiga qo'shimcha ravishda, foydalanuvchi bunday harakatlarga mualliflik huquqi egasining aniq
            roziligi bo'lmagan taqdirda, boshqa portallar, ma'lumotlar bazalari va intellektual faoliyatning boshqa
            natijalarining mazmunini yuklash yoki boshqalarga etkazish (portalda e'lon qilish) huquqiga ega emas.
          </li>
          <li class="mb-2">
            Ushbu Qoidalarda ruxsat etilgan hollar bundan mustasno yoki mualliflik huquqi egasining yozma ruxsatisiz
            bunday
            foydalanishga aniq roziligi bo'lgan hollar bundan mustasno, Portaldan yoki tarkibdan har qanday foydalanish
            qat'iyan
            taqiqlanadi.
          </li>
          <li class="mb-2">
            Agar ushbu Qoidalarda aniq boshqacha ko'rsatilmagan bo'lsa, ushbu Qoidalarda hech narsa Kontentga mutlaq
            huquqlarning o'tkazilishi sifatida qaralishi mumkin emas.
          </li>
        </ul>
      </v-col>

      <v-col cols="12" md="8" sm="12">
        <div :class="(isSmallScreen ? 'text-h6' : 'text-h5') + ' font-weight-bold pb-2-'" style="color: #2e74b5">
          5.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Portal tarkibi
        </div>
        <ul class="my-2 mx-6">
          <li class="mb-2">
            Foydalanuvchi o'zi yuklagan yoki boshqacha tarzda Portalda yoki uning yordami bilan ommaga etkazadigan
            (nashr
            etadigan) har qanday tarkib yoki boshqa ma'lumotlar uchun shaxsan javobgardir. Agar foydalanuvchi qonun
            hujjatlariga
            muvofiq sotib olingan yoki unga berilgan bunday xatti-harakatlarni amalga oshirish uchun tegishli huquqqa
            ega
            bo'lmasa, foydalanuvchi Kontentni Portalga yuklash, uzatish yoki e'lon qilish huquqiga ega emas.
          </li>
          <li class="mb-2">
            Portal ma'muriyati taqiqlangan tarkib borligini ko'rish uchun Portalni ko'rishi mumkin va har qanday
            tarkibni yoki
            foydalanuvchilarni o'zi xohlagan sabablarga ko'ra yoki hech qanday sababsiz, shu jumladan, hech qanday
            cheklovlarsiz, har qanday tarkibiy qismni siljitish yoki olib tashlash (yoki ogohlantirmasdan) olib
            tashlashi yoki
            olib chiqishi mumkin (ogohlantirmasdan). Ma'muriyatning shaxsiy fikriga ko'ra, ushbu Qoidalarni, qonunlarni
            buzadi
            va / yoki boshqa foydalanuvchilarning yoki uchinchi shaxslarning huquqlarini buzishi, zarar qilishi yoki
            xavfsizligiga tahdid qilishi mumkin.
          </li>
          <li class="mb-2">
            Portalda Internetdagi boshqa portallarga (uchinchi tomon portallari) havolalar, shuningdek maqolalar,
            fotosuratlar, rasmlar, grafika, musiqa, tovushlar, videolar, ma'lumotlar, ilovalar, dasturlar va uchinchi
            shaxslarga
            tegishli bo'lgan boshqa tarkiblar bo'lishi mumkin. (Uchinchi tomon tarkibi), bu intellektual faoliyat
            natijasi va
            qonunga muvofiq himoya qilinadi.
          </li>
          <li class="mb-2">
            Yuqorida ko'rsatilgan uchinchi shaxslar va ularning tarkibi ma'muriyat tomonidan ma'lum talablarga
            (ishonchlilik,
            to'liqlik, vijdonlilik va boshqalar) muvofiqligi tekshirilmaydi. Ma'muriyat foydalanuvchi tomonidan Portal
            yoki
            uchinchi shaxslar tarkibiga kira oladigan uchinchi tomon portallarida joylashtirilgan har qanday ma'lumot,
            shu
            jumladan uchinchi shaxslar portallarida yoki ularning tarkibidagi har qanday fikrlar yoki bayonotlar uchun
            javobgar
            bo'lmaydi.
          </li>
          <li class="mb-2">
            Fayllarni yuklab olish va / yoki Portalda joylashtirilgan uchinchi tomon dasturlarini o'rnatish bo'yicha
            havolalar
            yoki qo'llanmalar ma'muriyat tomonidan qo'llab-quvvatlanishi yoki tasdiqlanishini anglatmaydi.
          </li>
          <li class="mb-2">
            Portalda joylashtirilgan har qanday Portalga, mahsulotga, xizmatga, tijorat yoki notijorat xarakterga ega
            har
            qanday ma'lumotga havola ma'muriyat tomonidan ushbu mahsulotlar (xizmatlar) ning ma'qullanishi yoki tavsiya
            etilishi
            emas.
          </li>
          <li class="mb-2">
            Agar Foydalanuvchi Portalni tark etib, uchinchi tomon portallariga o'tishga yoki uchinchi tomon dasturlarini
            ishlatishga yoki o'rnatishga qaror qilsa, u o'zi uchun xavf tug'diradi va shu vaqtdan boshlab ushbu Qoidalar
            endi
            Foydalanuvchi uchun qo'llanilmaydi. Keyingi harakatlarida, foydalanuvchi amaldagi qoidalar va siyosatlarga,
            shu
            jumladan tarkibidan foydalanmoqchi bo'lgan shaxslarning biznes odatlariga amal qilishi kerak.
          </li>
        </ul>
      </v-col>

      <v-col cols="12" md="8" sm="12">
        <div :class="(isSmallScreen ? 'text-h6' : 'text-h5') + ' font-weight-bold pb-2-'" style="color: #2e74b5">
          6.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Portalning ishlashi va undan
          foydalanishda javobgarlik
        </div>
        <ul class="my-2 mx-6">
          <li class="mb-2">
            Foydalanuvchilar amaldagi qonunchilikka muvofiq Portalda ma'lumotlarning yaratilishi va joylashtirilishi
            munosabati bilan o'zlarining harakatlari uchun javobgardirlar. Ushbu Qoidalarning va amaldagi qonunlarning
            buzilishi
            fuqarolik, ma'muriy va jinoiy javobgarlikka sabab bo'ladi.
          </li>
          <li class="mb-2">
            Portal ma'muriyati undan foydalanuvchilar tomonidan foydalanish uchun texnik imkoniyatni ta'minlaydi,
            Foydalanuvchi tarkibini shakllantirishda qatnashmaydi va nazorat qilmaydi va Portaldan foydalanish bilan
            bog'liq
            biron bir shaxsning harakatlari yoki harakatsizligi uchun javobgar bo'lmaydi.
          </li>
          <li class="mb-2">
            Portalning axborot tizimida va uning dasturiy ta'minotida, intellektual faoliyat natijalariga uchinchi tomon
            huquqlarining buzilishining oldini olish va oldini olish maqsadida Ma'muriyat tomonidan amalga oshirilishi
            mumkin
            bo'lgan maxsus texnik echimlar bundan mustasno, portaldan foydalanish bo'yicha foydalanuvchilarning
            harakatlari va
            axborot munosabatlarini avtomatik ravishda senzura qiladigan va nazorat qiladigan texnik echimlar yo'q.
          </li>
          <li class="mb-2">
            Ma'muriyat istalgan vaqtda Portalning dizaynini, tarkibini, funktsional imkoniyatlarini o'zgartirish,
            foydalanilgan skriptlarni, dasturiy ta'minot va Portalda saqlanadigan boshqa ob'ektlarni, istalgan server
            dasturlarini istalgan vaqtda oldindan ogohlantirmasdan yoki xohlamasdan o'zgartirish huquqini o'zida saqlab
            qoladi.
          </li>
          <li class="mb-2">
            Portal ma'muriyati Foydalanuvchilarning ma'lumotlarini dastlabki tarzda o'rganib chiqadi va shaxslarning
            huquqlari
            va manfaatlarini himoya qilish va qonun talablariga rioya etilishini ta'minlash uchun boshqa har qanday
            harakatlarni
            amalga oshiradi.
          </li>
          <li class="mb-2">
            Portal ma'muriyati Foydalanuvchi tomonidan ushbu Qoidalarni buzganligi uchun javobgar emas va o'z xohishiga
            ko'ra,
            shuningdek, boshqa foydalanuvchilar yoki uchinchi tomonlardan foydalanuvchining ushbu Qoidalarni buzganligi
            to'g'risida ma'lumot olganida, foydalanuvchi tomonidan nashr etilgan har qanday ma'lumotni o'zgartirish
            (mo''tadil),
            blokirovka qilish yoki yo'q qilish huquqini o'zida saqlab qoladi. ushbu Qoidalarda belgilangan taqiqlarni
            buzgan
            holda, biron-bir sababga ko'ra yoki tushuntirishsiz, oldindan ogohlantirmasdan yoki foydalanuvchidan
            foydalanuvchining istalgan vaqtda Portalning barcha yoki har qanday bo'limlariga yoki funktsiyalariga
            kirishini
            to'xtatib qo'yadi, cheklaydi yoki bekor qiladi. Portal ma'muriyati, agar ma'muriyat, uning fikricha,
            ma'muriyat buni
            aniqlasa, foydalanuvchining Portalning istalgan funktsiyalariga kirishini to'xtatib qo'yish, cheklash yoki
            bekor
            qilish huquqini o'zida saqlab qoladi.
          </li>
          <li class="mb-2">
            Yuqoridagilar bilan bir qatorda, Portal ma'muriyati API dasturlarini blokirovka qilish va / yoki o'chirish,
            foydalanuvchilarning API dasturlariga, portallarga, uchinchi tomon dasturlariga, boshqa uchinchi tomon
            manbalariga
            kirishini cheklash, agarda portal ma'muriyati bo'lsa, ularga havolalarni blokirovka qilish va / yoki
            o'chirish
            huquqiga ega. bunday API dasturlari, portallar, begona dasturlar va boshqa uchinchi tomon resurslari
            Portalning va
            uning foydalanuvchilarining normal ishlashiga tahdid solishi yoki xavf tug'dirishi mumkinligiga asos
            bo'ladi. Portal
            ma'muriyati amaldagi qonunchilikka muvofiq yuqorida tavsiflangan tadbirlarni amalga oshiradi va
            foydalanuvchi yoki
            uchinchi shaxslar uchun bunday choralarning yuzaga kelishi mumkin bo'lgan salbiy oqibatlari uchun javobgar
            bo'lmaydi.
          </li>
          <li class="mb-2">
            Portal ma'muriyati Portalning ishlashi va ishlashini ta'minlaydi va texnik nosozliklar va uzilishlar bo'lgan
            taqdirda tezkor ishlashni tiklash majburiyatini oladi. Portal ma'muriyati vaqtincha ishlamay qolishi va
            portalning
            ishidagi uzilishlar va ular tufayli kelib chiqadigan ma'lumotlarning yo'qolishi uchun javob bermaydi.
            Ma'muriyat
            Foydalanuvchi yoki boshqa shaxsning kompyuteriga, mobil qurilmalarga, boshqa materiallarga yoki dasturiy
            ta'minotga
            Portaldan materiallarni yuklash bilan bog'liq bo'lgan yoki Portalda joylashtirilgan havolalar orqali
            etkazilgan
            zarar uchun javobgar emas.
          </li>
          <li class="mb-2">
            Portal ma'muriyati Portal faoliyati bilan bog'liq statistik ma'lumotlarga, shuningdek foydalanuvchilarning
            turli
            xil foydalanuvchilariga reklama ma'lumotlarini maqsadli namoyish etishini ta'minlash uchun
            foydalanuvchilarning
            ma'lumotlarini tasarruf etish huquqiga ega.
          </li>
          <li class="mb-2">
            Portal ma'muriyati foydalanuvchiga Portalni rivojlantirish va uning faoliyati to'g'risida ma'lumot yuborish,
            shuningdek o'z faoliyatini reklama qilish huquqiga ega.
          </li>
        </ul>
      </v-col>

      <v-col cols="12" md="8" sm="12">
        <div :class="(isSmallScreen ? 'text-h6' : 'text-h5') + ' font-weight-bold pb-2-'" style="color: #2e74b5">
          7.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Portal ma'muriyatining javobgarligi
          cheklanishi:
        </div>
        <ul class="my-2 mx-6">
          <li class="mb-2">
            Portal va uning funktsional imkoniyatlari, shu jumladan barcha skriptlar, ilovalar, portalning tarkibi va
            dizayni
            "qanday bo'lsa, shunday" taqdim etiladi. Ma'muriyat Portalning yoki uning funktsional imkoniyatlaridan
            foydalanishning aniq maqsadlari uchun mos bo'lishi yoki bo'lmasligi mumkinligi haqidagi har qanday
            kafolatlardan voz
            kechadi. Ma'muriyat portaldan va / yoki uning funktsional imkoniyatlaridan foydalanishning aniq natijalarini
            kafolatlay olmaydi va va'da qilmaydi.
          </li>
          <li class="mb-2">
            Tushunmovchiliklarning oldini olish uchun foydalanuvchi portaldan yuklab olishda yoki unda joylashtirilgan
            havolalarni ishlatishda va har qanday fayllardan, shu jumladan dasturlardan foydalanishda ehtiyotkorlik
            choralarini
            ko'rishi kerak. Portal ma'muriyati faqat litsenziyalangan dasturlardan, shu jumladan antivirus dasturlaridan
            foydalanishni qat'iy tavsiya qiladi.
          </li>
          <li class="mb-2">
            Portaldan foydalanib, foydalanuvchi portaldan yoki uning yordami bilan har qanday materialni o'ziga yuklab
            olishga
            rozi bo'ladi va ushbu materiallardan foydalanish oqibatlari, shu jumladan foydalanuvchining kompyuteriga
            yoki
            uchinchi tomonga etkazishi mumkin bo'lgan zarar uchun javobgar bo'ladi. ma'lumotlar yo'qolishi yoki boshqa
            har
            qanday zarar.
          </li>
          <li class="mb-2">
            Hech qanday holatda portal ma'muriyati yoki uning vakillari foydalanuvchi yoki uchinchi shaxslar oldida
            biron-bir
            bilvosita, tasodifiy, bexosdan etkazilgan zarar, shu jumladan yo'qolgan foyda yoki yo'qolgan ma'lumotlar,
            portaldan
            foydalanish bilan bog'liq bo'lgan sha'ni, qadr-qimmati yoki ishchanlik obro'siga etkazilgan zarar uchun
            javobgar
            bo'lmaydi. portal ma'muriyati yoki siz yoki boshqa shaxslar portal orqali kirish huquqiga ega bo'lgan boshqa
            materiallar, hatto portal ma'muriyati bunday zarar etkazilishi mumkinligini ogohlantirgan yoki ko'rsatgan
            bo'lsa
            ham.
          </li>
        </ul>
      </v-col>

      <v-col cols="12" md="8" sm="12">
        <div :class="(isSmallScreen ? 'text-h6' : 'text-h5') + ' font-weight-bold pb-2-'" style="color: #2e74b5">
          8.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Yakuniy qoidalar
        </div>
        <ul class="my-2 mx-6">
          <li class="mb-2">
            Ushbu Qoidalar Foydalanuvchi va Portal ma'muriyati o'rtasida Portaldan foydalanish tartibi va uning
            funktsional
            imkoniyatlari to'g'risida kelishuvni tashkil qiladi va foydalanuvchi va Ma'muriyat o'rtasidagi avvalgi
            kelishuvlarning o'rnini bosadi.
          </li>
          <li class="mb-2">
            Ushbu Qoidalar qonunga muvofiq tartibga solinadi va izohlanadi. Qoidalarda tartibga solinmagan masalalar
            qonun
            hujjatlariga muvofiq hal qilinishi kerak.
          </li>
          <li class="mb-2">
            Ushbu Qoidalarni amalga oshirish bilan bog'liq har qanday kelishmovchiliklar yoki kelishmovchiliklar yuzaga
            kelgan
            taqdirda, Foydalanuvchi va Portal ma'muriyati ularni muzokaralar orqali hal qilish uchun barcha
            imkoniyatlarni ishga
            soladilar. Agar nizolar muzokaralar yo'li bilan hal etilmasa, nizolar amaldagi qonun hujjatlarida
            belgilangan
            tartibda hal qilinadi.
          </li>
          <li class="mb-2">
            Ushbu Qoidalar Foydalanuvchi uchun qo'shilgan paytdan boshlab kuchga kiradi va noma'lum muddatga amal
            qiladi.
          </li>
          <li class="mb-2">
            Ushbu Qoidalar rus tilida tuzilgan va foydalanuvchiga boshqa tilda ko'rib chiqish uchun taqdim etilishi
            mumkin.
            Rus tilidagi Qoidalarning rus tilidagi versiyasi va Qoidalarning boshqa tildagi versiyasi o'rtasida tafovut
            bo'lsa,
            ushbu Qoidalarning rus tilidagi versiyasining qoidalari qo'llaniladi.
          </li>
          <li class="mb-2">
            Agar biron-bir sababga ko'ra yoki boshqa sabablarga ko'ra ushbu Qoidalarning bir yoki bir nechta qoidalari
            yaroqsiz yoki bajarib bo'lmaydigan deb topilsa, bu qolgan qoidalarning haqiqiyligi yoki qo'llanilishiga
            ta'sir
            qilmaydi.
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>


</template>

<script>
    export default {
        name: "TemplateUz",
        data: function () {
            return {
                model: null,
                windowSize: {
                    x: 0,
                    y: 0,
                }
            }
        },
        mounted() {
            this.onResize()
        },
        methods: {
            onResize() {
                // console.log('on resize')
                this.windowSize = {x: window.innerWidth, y: window.innerHeight}
            },
        },
        computed: {
            isXSmallScreen() {
                return this.windowSize.x < 700
            },
            isSmallScreen() {
                return this.windowSize.x < 1260
            },
        }
    }
</script>


<style scoped>

</style>
