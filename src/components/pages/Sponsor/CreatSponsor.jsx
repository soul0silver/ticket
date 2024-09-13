import axios from "axios";
import { useEffect, useState } from "react";

export default function CreateSponsor({ setOpen }) {
  const [pic, setPic] = useState();
  const [img, setImg] = useState();
  const [event, setEvent] = useState({});
  useEffect(() => {
    return () => {
      pic && URL.revokeObjectURL(pic.preview);
    };
  }, [pic]);
  const preview = (inputFile) => {
    const file = inputFile.target.files[0];
    setImg(file);
    file.preview = URL.createObjectURL(file);
    setPic(file);
  };

  async function onUpload() {
    const data = new FormData();
    if (img) {
      data.append("image", img);
      try {
        const res = await axios.post("https://api.imgur.com/3/image/", data, {
          headers: {
            Authorization: "Client-ID 2739162cd7d6953",
            "Content-Type": "image/jpeg",
          },
        });
        setEvent({ ...event, image: res.data.data.link });
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    }
  }
  return (
    <>
      <div
        className="absolute z-[21] w-full h-screen overflow-hidden flex items-center justify-center top-0 left-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.54)" }}
      >
        <div className="absolute z-[22] w-full h-full top-0 left-0" onClick={()=>setOpen(false)}></div>
        <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl relative z-50">
          <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAALTElEQVR4nO2deVAUZxrGYUaOGTziifGMxiOVuG5ltzZurVZt7VZtVbZS+0cqogJqNFERQXA9959NNq5r1I3ReMAwiHIIiigaD4jGA89VMKtkPaIcwzCc4qgIAUX02fq6Z6Dn6Jmeme6vh6p+q55/UmVV8/y+eb633/m+SUCAUkoppZRSSimllFJKKaWUSPX2LQRPLW7ZOLW4pW5acUvttOKWDeS/+bvBb/fQ53Yo8uDTSlpho+KWDQF+XtN66HM7FLOC7P6QqSUt9QF+XlN76HM7lMMqsijAz2taj3ju1aUjAlbdzAtYfeNp4OqbCFx1A4Gr/ovAxEsIjDuNwJgTTv8IItXCo1DHFEIddwbqxCtQJ16GOvES1AlEF9Fr6QVW8efRK76IVdw59Io7i6AlRGcQtOQ0gmKJvkfQ4lMIJoo5ieCY71gtKkTwogIELyxAyMITrBYcR8iCYwj5lOgoQj/51qIjCJ29D6GRGQiJSOV97tDpSdDMSIU2Mh3a2ftYRedAE5X9VBudfahPZPZ4euavKTUHrC5FAGO+hwAWOAGQ4B5AEBdArIcAGPOtAI5yABzhAEh3DeCjJGhn6DkAchgA2uhsaKP3QhuVZdbMTR8uPYA1P+YFrCHmWwHc4AC4KADAtxwAlzkALnIAnO8GwKx+DwAs6gYQIgTAfBEARO1FWBSBkJlLAUDpU6cAVnoIYIkjgF5L3QE4wwFAzLcCOMkBUMgB4Dx+Qj7lxM/8wxwAevcAZrkE8IQCgB+7zefmfxeA76UBsMQ5gGA+AAs9BDBLKIA9HAAkfrIZ88OishAWmQX5ASxxDUDNACjoBpAg9QZ83PUG7C2AaH8AsIoOgCApN2AGQI5bAJqPdnIA2G7A3QAyaQDg2YBX/tDVBalijuO9IrPDH/HeeTMLYDEnghKEbsBnpNmACYA5BABpQ/WYcq7J4bmnnHtgAZBq2QMc819eACstAJZdQWD8OQbAmF13HP6QMfpbFgCnoI476x8bMNHc/QiNykRohB7jdlxzeO5x266yAGamQRuZITMAvvwnAJZfRWDCBahiv4M69gQDgXwSiMak3oY65hjUi06wq3/pef/YgBkAeQiNzoZmZho0s1IZCGTVE43bfhWaGTpoI3Rs/JBuh2cDlh/AiusITLgEVUIRVIsLoVp0DKqFREfZN2Biftxpu9V/idIGzI0fOwDz8pl9QBO9F5qZuxAaoUPodKJk9g04IgXayD3dLWi0PwBYxQNgRQlUCRehWloEVdwZqGJPWWQxPt5ivr9swPPzWQDzDkJDPgUEQlS65dOwmxHz8mWNHhcbMGUAdhuwBYCKAFheAtWyK1CROIovgorsC/FF7Ga7zDr/4WzAnua/mBtwF4BD0Hx8EJo5udDMzoYmKqtLjNlz9vO+gMkLYCUPgOXFUC2/BtVfia5Ctew/UBN1DeD8ZANmAByCxgrg4zxo5hIdgGZuLgOk23xnL2DUAfDk/8rrHADE/OJu87sAXHENIF6GDXierwC6819eACtcA1DbA5BtAz7iEQCtPYBomQG8dfgBJuYTNWLioUZMOMhqfB5RA8YfaMA4otwGvJlbjzf3sxq7rx5jc+owhii7Dm8Q7SWqxegsVqMyazEqo4bRyHRWI/YQmTBitwnDidJMGLarmlVqNV4n0ldjqN6IoSmswnVGhCdXYQhREqvBO4kMGLSD1cDtRJUYuK0SA75h1X9rBastFXiN6OsK9Pu6HP02l6PfV+XoS/TvMvQh2sSq90ai+wjbcB9hX96XHoCN+RYA4w8KMH9ffZf5Y5yYPzqzG4DV/JHOzE+zmL/Lhfk6i/nJzs0fxDXfCmBrpYP5r1nN32w1v5zffKoAOOazq7+BkdV8BoCd+Y6rn8d8m9Vvaz539TPmMwDszbdd/YMZAAYMdmX+NwLMt1v9VvN7c8zXUgHgyny71c9vPgdApoDocWW+XoD59tGzTUD0bOaPnt6bnJuvXX+PLgBhue86ekYJzf00Abmvc537g6TIfSuA9ffoAPAq93ME5H4Gf+47rH6auW8F4Mr8L1nzNf+iAcBV9LjN/Tq8QTP3d3LN548eX3PfuvqpAbBGj6S5v9t9yxmeQi/3nbWc9uZTASAo971oOUd4kfuTMmowKcPkce47i55+Di2n8Ny3mq9ZRwWAbctJM/df55g/VGfEHXMH7po72E8AZ/UPEqvl3OQ+erjmh677iQ4AMXLfdvWbGA33oOWMKngAa0Ueb/Q49/sLzX0XLScXADE/9J80ADjLfRlGDedN7V0Aikzt3ue+h6OGMD7zaQGgNmpI5Tf/9wdq8Qq29YfcWhFGDd7lvtX8ECoAeEYNHue+Dy3n/p9a7OwH9t1toTJqsAFgZ37IWkoA5Bw1vJNuwrNO+/UPPO98hXd2V0s+anCW+wyAtZQAuBo1SD5i1lVhyw9PwFdfFT+WZMQsJHqI+cFf3KUAwNvcF2HUMDrVCHP7S14Aj9pfYmSyQdJRA5/5IWvv0gMg14h59QUz3NWKs02Sjhq45nOjh5hPBYBUuT/MWe6nGDFCX413s2rwweF6lD3ucAug7FEH/nygDr9IMyJ8e6XnowYhub/OufnB/6AFQMiIOVPYiPndnFpEFjxAYpEZm64/QfrtFpysakNp03M0/Nzp0G56UuTfNrZ24mbjMxRWtCKttBnrL5sRW9iID/NqMTHZ4FPLyQDgmB9EC4CYo4amtk7IVQQOf/QIz32r+UGf0wAg8og5sciMF/z7qmT14uUrxBQ0CMt9npaTGz0sgDvSA5Ci5Zx54gFaOuhRaOt4hekH67waNbgyvxcVABKNmN/Pr8dDFy2mWPWovRN/yjaJmvskehgAn1ECIFq/n2rbck7JqYWh+YVk5lc3v8Cvdxl9GjV05f4XjuZTAeBpy+nJiDlcZ8TkDBP+1/RcdPPvND3HWzqDz6MGp9HzGU0AFE6zjU2tZkbMYtXF6jaM2Fbh/ajBTe5TBkDnNNtwnRFHylp9Nv9YWSuGbCkXbdTgLPepAqB5mm3S7mqfAUxIMog6anBlPj0AlE6zRR9v9BlARH6dNLkvJwBap9k2lzz2GcCGK2aRW05+8+kAoHia7ayxzWcApyt/ljz3qQKgdZpt8HaDy9m/Jy9efXzMfb6WUx4AlE6z/SarRtC0U8i09Jd6g2ijBr8AQOMU8+JT3ed+nBUZMb+fW4M/ZptQXOf6neGTo/WijRpkB+DLaTZr9NjkfpLz02wpN5udmmlu78Tfzj3EwC3lNl+wxBQ0oqHV+Wh7Z8lj2+gRkvsCWk55APhwms2TU8wl9c9sTOx4+Qq6G08waqfB5tst7leL4VsrmC9c2l/YBtO12nbRRg1+AUCMi3O8p5i3V2LoDoONiUXGNvw2wyT4VMNkfRXyOWeHyDGW/hudn+UUI/fpAvA19wVcoJi8h30DvvvwOT7Mr/P6NNtf9tcwQziCcuKOCtFbTlkAiNlyDnJxlPB3e2sweJvtl+renGrou7EMv9Ib3LScvuW+PAB60MU5rcS5TxeAF6fZ5LgwHSbRqEF2AD3x4pxG4tynC6AHXpzTCBk1iGA+NQB+d3Fug2+n2cSIHmoApLowPUDCi3NijhrkB+B21GCX+1Qvzt2TJfepAxBj1ODTxbmN/tFyygPA11GDDBfnQiTOfaoA6P9GT5nf574MAHwfNYh9YVrrw2m2ngVAitzf0nNGDbIDGKo3NvvDb7OFiXiaTTzdlv5/4BCeYjxE47fZ+vrpqMGl/n4nT3IAw/Q1E4boqh769NtslEcNQXTMN4d8fmtcAI0akFw9fEiSIXdIclWz9KOG+5KfZvPN+NvNZOVTM18ppZRSSimllFJKKaWUUkoppZRSSqmAnlr/B3zlQ6cAF/ovAAAAAElFTkSuQmCC"></img>
          </div>
          <div className="flex justify-between">
            <div className="p-2 md:p-24 md:pr-4 flex flex-col items-center gap-4">
              <img style={{width:"300px"}} src={pic?.preview} alt="" />
              <label
                style={{
                  border: "1px solid",
                  padding: "4px 5px",
                  marginTop: "5px",
                }}
                htmlFor="file"
              >
                {pic ? "Change image" : "Add image"}
                <input
                  type="file"
                  name="image"
                  id="file"
                  onChange={preview}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <form className="p-6 md:p-24 w-8/12" onSubmit={(e)=>{e.preventDefault()}}>
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <input
                  type="text"
                  id="username"
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="Event's name"
                />
              </div>
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <input
                  type="number"
                  id="password"
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="Price"
                />
              </div>
              <button onClick={onUpload} className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
