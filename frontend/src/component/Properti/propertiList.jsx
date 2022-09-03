import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Home/Navbar";
import Header from "../Home/Header";
import "./propertiList.css";

const PropertiList = () => {
  return (
    <div className="prop">
        <div className="propertiItem">
      <img
        src="https://static.republika.co.id/uploads/images/inpicture_slide/rumah-tapak-tetap-menjadi-bintang-di-sektor-properti-dengan_220123211855-855.jpg"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">Nama Properti</h1>
        <span className="siDistance">Luas Bangunan:</span>
        <span className="siDistance">Luas Tanah:</span>
        <span className="siTaxiOp">Status Jual atau Beli</span>
        <span className="siSubtitle">
          Fasilitas
        </span>
        <span className="siFeatures">
          Taman Kanak-kanak • WiFi • AC • 2 bathroom 21m² • 1 WC
        </span>
        <span className="siCancelOp">Vila Bandung Indah: Cileunyi Jawabarat </span>
        <div className="siCancelOpSubtitle">
        <FontAwesomeIcon icon={faLocationDot} />
        <span> Lokasi</span>
        </div>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Rating</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Rp. 2000 Juta</span>
          <span className="siTaxOp">Sudah termasuk pajak dan biaya</span>
          <button className="siCheckButton">Lihat ketersediaan</button>
        </div>
          </div>
     </div>
     <div className="propertiItem">
      <img
        src="https://static.republika.co.id/uploads/images/inpicture_slide/rumah-tapak-tetap-menjadi-bintang-di-sektor-properti-dengan_220123211855-855.jpg"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">Nama Properti</h1>
        <span className="siDistance">Luas Bangunan:</span>
        <span className="siDistance">Luas Tanah:</span>
        <span className="siTaxiOp">Status Jual atau Beli</span>
        <span className="siSubtitle">
          Fasilitas
        </span>
        <span className="siFeatures">
          Taman Kanak-kanak • WiFi • AC • 2 bathroom 21m² • 1 WC
        </span>
        <span className="siCancelOp">Vila Bandung Indah: Cileunyi Jawabarat </span>
        <div className="siCancelOpSubtitle">
        <FontAwesomeIcon icon={faLocationDot} />
        <span> Lokasi</span>
        </div>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Rating</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Rp. 2000 Juta</span>
          <span className="siTaxOp">Sudah termasuk pajak dan biaya</span>
          <button className="siCheckButton">Lihat ketersediaan</button>
        </div>
          </div>
     </div>
    </div>
    
    
  );
};

export default PropertiList;