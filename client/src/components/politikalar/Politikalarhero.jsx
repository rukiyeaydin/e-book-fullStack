import React, { useState } from 'react'
import './politikalar.css'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Politikalarhero = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [activeSection, setActiveSection] = useState(queryParams.get('section'));

  const handleKosullar = () => {
    setActiveSection('kosullar');
  }
  const handleGizlilik = () => {
    setActiveSection('gizlilik');
  }
  const handleYardim = () => {
    setActiveSection('yardim');
  }

  return (
    <div className='politikalar'>
      <div className="politikaNavbar">
        <ul>
          <li onClick={() => handleKosullar()}><Link to='/politikalar?section=kosullar' className={activeSection === 'kosullar' ? 'politikaAktif' : 'politikalink'}>Koşullar</Link></li>
          <li onClick={() => handleGizlilik()}><Link to='/politikalar?section=gizlilik'  className={activeSection === 'gizlilik' ? 'politikaAktif' : 'politikalink'}>Gizlilik</Link></li>
          <li onClick={() => handleYardim()}><Link to='/politikalar?section=yardim' className={activeSection === 'yardim' ? 'politikaAktif' : 'politikalink'}>Yardım</Link></li>
        </ul>
      </div>
      <div className="politikaIcerik">
        {activeSection === 'kosullar' && (
        <div className="kosullar">
          <h2>KOŞULLAR</h2>
          <br />
          <h3>13 yaşında veya daha büyük olmalısınız</h3>
          <br />
          <p>RKM Hizmetleri yalnızca 13 yaş ve üzeri kişiler içindir. 13 yaş altında birini RKM Hizmetleri'ni kullanırken tespit edersek, hesaplarını sonlandıracağız.</p>
          <br /><br />
          <h3>Bir RKM hesabınız olmalı</h3>
          <br />
          <p>Sitede hesap oluşturmadan çok fazla gezinemez veya Hizmetleri kullanamazsınız. RKM platformundan en iyi şekilde faydalanmak için hesap oluşturmalı, bir hesap adı seçmeli ve bir şifre belirlemelisiniz.</p>
          <br />
          <p>Hesabınız üzerindeki tüm faaliyetlerden sorumlusunuz ve şifrenizi gizli tutma sorumluluğunu üstlenmelisiniz. Hesap bilgilerinizi başkalarıyla paylaşırsanız, başka bir kişi hesabı ele geçirebilir ve kimin doğru hesap sahibi olduğunu belirleyemeyebiliriz. Bu durumlar altında sizin (veya hesap bilgilerinizi paylaştığınız herhangi bir kişinin) eylemlerinin sonucunda size herhangi bir sorumluluk yüklemeyeceğiz.</p>
          <br /><br />
          <h3>İçeriğiniz sizindir</h3>
          <br />
          <p>RKM'ye herhangi bir içerik göndermeden önce İçerik İlkelerimizi okumanız önemlidir. İçeriğiniz bu ilkelere uymuyorsa herhangi bir zamanda kaldırılabilir.</p>
          <br />
          <p>RKM Hizmetleri'nde oluşturduğunuz ve yayınladığınız içeriklerin tüm hakları size aittir. Elbette, içerik başlangıçta size ait değilse, RKM'ye koymak onun sizin olduğu anlamına gelmez. Telif hakkını elinde bulundurmadığınız içerikleri göndermeyin (izin almadıkça, bu terimlerde belirtilen tüm hakları RKM'ye vermek dahil).</p>
          <br />
          <p>RKY'ye içerik gönderdiğinizde, RKY Hizmetleri kullanıcılarına bu içeriği görüntülemek için geçerli telif hukuku kapsamında yasal izne ihtiyacımız var. Hukuki olarak bu, içeriğinizi RKM Hizmetleri'nde yayınlamak için bize münhasır olmayan bir lisans verdiğiniz anlamına gelir, içeriği yayınlamanın (saklama, görüntüleme, yeniden biçimlendirme ve dağıtma gibi) mantıklı bir şekilde ilişkili olduğu her şey dahil. RKM topluluğuna hikaye içeriğinizi nasıl lisanslamak istediğinizi belirlemeniz gerekecektir. Bu kararı vermenize yardımcı olmak için Telif Hakkı Rehberimizi okuyun lütfen.</p>
        </div>
        )}
        {activeSection === 'gizlilik' && (
        <div className="gizlilik">
          <h2>GİZLİLİK</h2>
          <br />
          <p>RKM, gizliliğinizi koruma ve bilgilerinizi güvende tutma konusunda kararlıdır. RKM, sizi ilgilendiren bilgileri birkaç farklı şekilde işler. Bu Gizlilik Politikası, bir RKM hesabı oluşturduğunuzda ve rkm.com ("Site") veya mobil uygulamalarımızı kullanarak RKM topluluğuna içerik gönderdiğinizde, yani oluşturduğunuz hikayeler, yorumlar ve mesajlar gibi kişinizi tanımlayabilen bilgileri ("Kişisel Bilgiler") nasıl topladığımızı, kullandığımızı, paylaştığımızı ve sakladığımızı açıklar.</p>
          <br />
          <h3>Kişisel bilgi</h3>
          <br />
          <p>"Kişisel Bilgi," sizi tanımlayabilen herhangi bir bilgidir. Bu, ancak bununla sınırlı olmamak üzere adınız, posta adresiniz, telefon numaranız, e-posta adresiniz, İnternet Protokolü ("IP") adresiniz, yaşınız, cinsiyetiniz, medeni durumunuz, sağlık bilgileriniz, finansal durumunuz, kredi kartı bilgileri ve kredi geçmişi gibi bilgileri içerebilir.</p>
          <br /><br />
          <h3>Ne istiyoruz ve neden istiyoruz</h3>
          <br />
          <p>Eğer sitemizde sadece göz atıyorsanız, sizinle ilgili herhangi bir Kişisel Bilgi toplamıyoruz. RKM hesabı oluşturmanız ve hizmetlerimizi kullanmanız için bazı Kişisel Bilgileri toplamamız gerekiyor.</p>
          <br />
          <p>Site üzerinde görüntülenmeyecek (hesap ayarlarınız aracılığıyla ilgili bilgileri kamuoyuna açık olarak görüntülemeyi tercih etmediğiniz sürece), diğer RKM kullanıcılarına ifşa edilmeyecek veya veriler anonimleştirilmediği sürece kiralanan veya satılan kişilere verilmeyecek. RKM topluluğuna üçüncü taraf sosyal medya platformları aracılığıyla katılma hakkında daha fazla bilgi için Facebook/Google+ ile Kaydolma makalemizi ziyaret edin.</p>
          <br />
          <p>RKM hesabınızı oluşturmak için gereken e-posta adresi dışında, herhangi bir Kişisel Bilgiyi bize ifşa etmeme seçeneğiniz her zaman vardır, ancak bu durumda Hizmetlerin belirli özelliklerini kullanamayabilirsiniz. Daha fazla bilgi için Hesap Gizliliği makalemizi ziyaret edin.</p>
          <br /><br />
          <h3>Neden yaşınızı öğrenmek istiyoruz</h3>
          <br />
          <p>13 yaşın altındaki çocukların RKM'yi kullanmasına izin verilmez, bu nedenle bu Gizlilik Politikası, RKM Hizmetleri'nin kullanımı için onlarla ilgili herhangi bir düzenleme yapmaz.</p> 
          <br />
          <p>Eğer bir ebeveyn veya vasii iseniz ve küçük çocuğunuzun rızanız olmadan bize Kişisel Bilgi sağladığını öğrenirseniz, lütfen aşağıdaki iletişim bilgilerini kullanarak bizimle iletişime geçin.</p>
        </div>
        )}
        {activeSection === 'yardim' && (
        <div className="yardim">
          <h2>YARDIM</h2>
          <br />
          <h3>Kitap yazmaya nasıl başlamalıyım?</h3>
          <br />
          <p>İlk adım, yazmak istediğiniz konu veya hikaye hakkında bir fikir oluşturmaktır. Bir plan yapın, karakterleri oluşturun ve ana hikayenin temelini belirleyin. Ardından, yazma sürecine başlayabilirsiniz.</p>
          <br /><br />
          <h3>Kitap yazarken nasıl ilham bulabilirim?</h3>
          <br />
          <p>İlham kaynakları farklılık gösterebilir, ancak günlük yaşam, doğa, diğer kitaplar, sanat, seyahat ve deneyimler gibi kaynaklardan ilham alabilirsiniz. Ayrıca, düzenli yazma alışkanlığı da ilhamın en iyi kaynağı olabilir.</p>
          <br /><br />
          <h3>Karakter geliştirmenin ipuçları nelerdir?</h3>
          <br />
          <p>Karakterlerinizi canlandırmak için detaylı profiller oluşturun. Onların kişilikleri, arzuları, korkuları ve geçmişi hakkında düşünün. Karakterlerinizi okuyucuların bağ kurabileceği karmaşık ve gerçekçi kişilikler haline getirin.</p>
          <br /><br />
          <h3>Kitap yazarken düşünce akışımı nasıl koruyabilirim?</h3>
          <br />
          <p>Düşünce akışını korumak için yazma rutini oluşturun. Her gün belirli bir süre yazmayı deneyin. İlk taslağı tamamlamadan düzenlemeye odaklanmayın, bu sizi yazma akışından çıkarabilir.</p>
          <br /><br />
          <h3>İlk taslağımı nasıl düzeltebilirim?</h3>
          <br />
          <p>İlk taslağınızı düzeltmeye başlamadan önce bir süre ara verin. Sonra metni detaylı bir şekilde okuyun, dilbilgisi ve yazım hatalarını düzeltin. Ardından, hikaye akışını ve karakter gelişimini değerlendirin. Belirli bir süreçte birden fazla düzeltilmiş taslak oluşturabilirsiniz.</p>
        </div>
        )}
      </div>
    </div>
  )
}

export default Politikalarhero
