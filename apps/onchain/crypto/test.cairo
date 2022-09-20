// Welcome to the Cairo playground!
//
// The purpose of this site is to allow you to play with the Cairo language
// without downloading and installing the toolchain on your computer.
// If you want to install it, you can read the instructions [here](https://www.cairo-lang.org/docs/quickstart.html).
//
// On the top-right corner, you should see the "Challenges" button.
// The challenges provide hands-on exercises that teach you how to write code in Cairo.
// For more information, you can read the two tutorials: "Hello Cairo" and
// "How Cairo Works", which can be found [here](https://www.cairo-lang.org/docs/).
//
// So, let's get started!
// 1. Click on the "Debug" button to run the code below.
// 2. You should see the output of the run in the "output" panel below.
// 3. After clicking "Debug", the playground enters "debug" mode,
//    where you can follow the execution of the program.
// 4. Click on the buttons with the right and left arrows located at the
//    top-right corner of the "Memory" panel to respectively advance or rewind
//    the steps of the program execution.
//    You may also press 's' to move forward and 'S' (shift+s) to move backward.
// 5. Take a look at the "Watch" panel (located at the bottom right),
//    where you can see the values of the variables in the current context.
// 6. The "Memory" panel enables you to examine the lower-level details of
//    the run.
// 7. Find the value of output_ptr in the "Watch" panel. This value is a pointer
//    to the memory. Find the memory row with that address and verify that you
//    see the 3 output values in the right column.
//
// See you in the next challenge!
%builtins output pedersen ecdsa

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.hash import hash2
from starkware.cairo.common.signature import verify_ecdsa_signature

// Import the serialize_word() function.
from starkware.cairo.common.serialize import serialize_word

@storage_var
func state(st: felt) -> (res: felt) {
}
// Increases the balance of the given user by the given amount.
// @external
func increase_balance{output_ptr: felt*, pedersen_ptr: HashBuiltin*, ecdsa_ptr: SignatureBuiltin*
//syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr, ecdsa_ptr: SignatureBuiltin*
//}(user: felt, amount: felt, sig: (felt, felt)) {
}(user, amount, sig: (felt, felt)) {
    
    // Compute the hash of the message.
    // The hash of (x, 0) is equivalent to the hash of (x).
    
    let (amount_hash) = hash2{hash_ptr=pedersen_ptr}(amount, 0);
    
    // Verify the user's signature.
    
    verify_ecdsa_signature(message=amount_hash, public_key=user, signature_r=sig[0], signature_s=sig[1]);

    serialize_word(user);
    return ();

    // let (res) = balance.read(user=user);
    // balance.write(user, res + amount);
    //serialize_word(amount);
    //return ();
}

func main{output_ptr: felt*, pedersen_ptr: HashBuiltin*, ecdsa_ptr: SignatureBuiltin*}() {
    tempvar x = 4321;
    tempvar user = 1628448741648245036800002906075225705100596136133912895015035902954123957052;
    tempvar sig = (1225578735933442828068102633747590437426782890965066746429241472187377583468, 3568809569741913715045370357918125425757114920266578211811626257903121825123);
    increase_balance(user, x, sig);
    return ();
}
