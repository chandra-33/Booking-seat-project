import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  totalSeats = 80;
  rows = 11; 
  seatsPerRow = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3]; 
  seats = [];
  bookedSeats = [];

  constructor() {
    this.initializeSeats();
  }
  initializeSeats() {
    let seatNumber = 1;
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.seatsPerRow[i]; j++) {
        row.push({ seatNumber: seatNumber++, isBooked: false });
      }
      this.seats.push(row);
    }
  }
  bookSeats(numSeats: number) {
    if (numSeats > 7 || numSeats < 1) {
      alert('You can book between 1 and 7 seats at a time.');
      return;
    }
    for (let i = 0; i < this.rows; i++) {
      let availableSeatsInRow = this.seats[i].filter(seat => !seat.isBooked);
      if (availableSeatsInRow.length >= numSeats) {
        this.reserveSeats(i, availableSeatsInRow.slice(0, numSeats));
        return;
      }
    }
    let seatsToBook = [];
    for (let i = 0; i < this.rows && seatsToBook.length < numSeats; i++) {
      let availableSeatsInRow = this.seats[i].filter(seat => !seat.isBooked);
      for (let j = 0; j < availableSeatsInRow.length && seatsToBook.length < numSeats; j++) {
        seatsToBook.push(availableSeatsInRow[j]);
      }
    }

    if (seatsToBook.length === numSeats) {
      for (let seat of seatsToBook) {
        this.reserveSeat(seat);
      }
    } else {
      alert('Not enough seats available to fulfill the booking.');
    }
  }
  reserveSeats(rowIndex: number, seatsToReserve: any[]) {
    for (let seat of seatsToReserve) {
      this.reserveSeat(seat);
    }
  }
  reserveSeat(seat: any) {
    seat.isBooked = true;
    this.bookedSeats.push(seat.seatNumber);
  }
  displaySeats() {
    console.log('Current seat status:');
    for (let row of this.seats) {
      console.log(row.map(seat => seat.isBooked ? '[X]' : `[${seat.seatNumber}]`).join(' '));
    }
  }
}
