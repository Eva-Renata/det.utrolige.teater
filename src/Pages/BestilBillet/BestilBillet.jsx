import axios from "axios";
import React, { useEffect, useState } from "react";
//import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
//import { useAuth } from "../../App/Auth";
import { Layout } from "../../App/Layout";
import styles from "./BestilBillet.module.scss";

function BestilBillet() {
  const { forestilling_id } = useParams(0);
  // grouped seats by row
  const [groupedSeats, setGroupedSeats] = useState([]);
  // selected seats on the checkboxes
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [forestilling, setForestilling] = useState([]);
  //const { loginData } = useAuth();
  // total number of tickets to be purchased
  const [totalTickets, setTotalTickets] = useState(0);
  // Destructer vars fra useForm hook
  //   const {
  //     register,
  //     handleSubmit,
  //     clearErrors,
  //     formState: { errors },
  //     reset,
  //   } = useForm();

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `https://api.mediehuset.net/detutroligeteater/events/${forestilling_id}`
      );
      //console.log(result.data.item);
      setForestilling(result.data.item);
      const seats = await axios.get(
        `https://api.mediehuset.net/detutroligeteater/seats/${forestilling_id}`
      );
      const groupedSeats = [];
      // group the seats into rows
      seats.data.items.forEach((seat) => {
        const lineNumber = Number(seat.line);
        // if the group has index === the line number
        // add the seat to that array
        if (groupedSeats[lineNumber]) {
          groupedSeats[lineNumber].push(seat);
          // else create new array for that line
        } else {
          groupedSeats[lineNumber] = [seat];
        }
      });

      setGroupedSeats(groupedSeats);
    };
    getData();
    //efter kald af funktion den kører kun en gang.
    //vi skriver i dependency forestilling_id, så den re-renderer hver gang vi trykker på id.
  }, [forestilling_id]);

  const dateFormat = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      hour12: false,
      minute: "numeric",
    };

    dateString = new Date(dateString);
    return dateString.toLocaleDateString("da-DK", options);
  };
  const updatePrice = (event) => {
    // update the total price by multiplying the number of
    // selected tickets by the ticket price
    setTotalTickets(event.target.value);
  };

  const updateSelectedSeats = (event, seat) => {
    if (event.target.checked) {
      // add the selected seats to the state
      setSelectedSeats([...selectedSeats, seat.id]);
    } else {
      // use array filter to remove the clicked seat
      // from the array and return the new array
      setSelectedSeats(
        selectedSeats.filter(function (item) {
          return item !== seat.id;
        })
      );
    }
    // if we select more seats than the number of tickets
    // set the total ticket number to be the
    // amount of selected seats
    //  don't know why but have to add 1, to work
    if (selectedSeats.length >= totalTickets) {
      setTotalTickets(selectedSeats.length + 1);
    }
  };

  return (
    forestilling && (
      <Layout title="Bestil Billet">
        <form>
          <section className={styles.bestilbilletwrapper}>
            <figure className={styles.købfigure}>
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${forestilling.image})`,
                }}
              ></div>
              <figcaption>
                <h3>Køb billet</h3>
                <h5>{forestilling.title}</h5>
                <h4>
                  {forestilling.stage_name}{" "}
                  {/* tilfojer starttime til startdate */}
                  {dateFormat(
                    forestilling.startdate + " " + forestilling.starttime
                  )}
                </h4>
                <div className={styles.inputswrapper}>
                  <div className={styles.flexeddiv}>
                    <label htmlFor="firstname">FORNAVN</label>
                    <input type="text" id="firstname"></input>
                  </div>
                  <div className={styles.flexeddiv}>
                    <label htmlFor="lastname">EFTERNAVN</label>
                    <input type="text" id="lastname"></input>
                  </div>
                  <div className={styles.flexeddiv}>
                    <label htmlFor="address">VEJNAVN & NR</label>
                    <input type="text" id="address"></input>
                    <input type="text" id="number"></input>
                  </div>
                  <div className={styles.flexeddiv}>
                    <label htmlFor="zipcode">POSTNR. & BY</label>
                    <input type="text" id="zipcode"></input>
                    <input type="text" id="city"></input>
                  </div>
                  <p>*alle felter skal udfyldes!</p>
                </div>
                ANTAL
                <input
                  type="number"
                  value={totalTickets}
                  onChange={updatePrice}
                />{" "}
                PRIS {totalTickets * Number(forestilling.price)} DKK
                <p>pris inkl moms</p>
              </figcaption>
            </figure>
          </section>
          <section className={styles.seats}>
            <h3>FRISCENEN</h3>
            {groupedSeats.length
              ? groupedSeats.map((seats, index) => {
                  return (
                    <section className={styles.seatsdisplaysection} key={index}>
                      <p>
                        {seats.length &&
                          seats.map((seat) => {
                            // if value of is_reserved is more than 0,
                            // the seat is reserved
                            const isReserved = seat.is_reserved > 0;
                            return (
                              <span key={seat.id}>
                                <input
                                  name="seats[]"
                                  value={seat.id}
                                  type="checkbox"
                                  checked={selectedSeats.includes(seat.id)}
                                  disabled={isReserved}
                                  onChange={(event) =>
                                    updateSelectedSeats(event, seat)
                                  }
                                ></input>
                              </span>
                            );
                          })}
                      </p>
                    </section>
                  );
                })
              : null}
          </section>
          <button className={styles.købbilletbutton}>Godkend bestilling</button>
        </form>
      </Layout>
    )
  );
}

export default BestilBillet;
