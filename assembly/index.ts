import "wasi";
import { clock_time_get, clockid, fd_write } from "bindings/wasi";



const stdout = 1;

// this string will be sent to stdout
const str = "script is initializing...";

// convert the string to a buffer
const utf8Buffer = String.UTF8.encode(str);

//
const iov = memory.data(16);

//
store<u32>(iov, changetype<u32>(utf8Buffer));

//
store<u32>(iov, utf8Buffer.byteLength, sizeof<u32>());

//
let written_ptr = memory.data(8);

// write through wasi
fd_write(stdout, iov, 1, written_ptr);



export function getAClockId(): u64 {
	let time_ptr = memory.data(8);
	clock_time_get(clockid.REALTIME, 1000000, time_ptr);
	return load<u64>(time_ptr)
}
