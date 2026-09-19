# BitLine (BL)

## General
Files of this language have the .bl extension

## Usecases
None (preferably)

## Syntax

### Intro
This language (like many others) uses Braces `{}` and Semicolons `;`

### Data Types

There are only 2 data types, you don't need more.

```
bit (either a 0 or a 1)
byte (a collection of 8 bits, initialize with [ eight 1 or 0 ])
void (only functions)
```

### Variables

Convention:
- bit variables are camelCase
- Byte variables are UpperCamelCase

```
varName : type = value;

bitVar : bit << 0;
bitVar : bit << 1;

ByteVar : byte << [00000000];
ByteVar : byte << [0000 000 0];
ByteVar : byte << [ 110 0 1 001 ];
```

### Printing

Print with `$`.\
`$;` prints a new line.

```
$ 0; $;
$ 1; $;
$ [00110000]; $;
```

Prints\
"0\
1\
001100000"

Printing a byte with `@` results in the corresponding ASCII character being printed

```
@ [01101000];
@ [01101001];
```
Prints "hi"

### Reading and writing to bytes

Access individual bits (the index is in binary of course)

```
byteVar : byte = [0000 0100];
$ byteVar[0, 1, 0];
```

Prints the
```
0 * 4 +
1 * 2 +
0 * 1
= 2nd bit index -> "1"
```

Writing

```
byteVar : byte = [0000 0000];

byteVar[0, 1, 0] = 1;

$ byteVar; $;
```

Prints `00000100`

### Functions

Convention:
- Util functions are all caps
- Others are camelCase
```
BOX UTILFUNC (
    paramter : type
) returnType {
    [body]...
}



BOX nonUtilFunc () void {
    $ [01011010]; $;
    $ [10100101]; $;
    $ [01011010]; $;
}
```


### Return statement

```
BOX ...
{
    ...

    << value;
}



Example: A function that returns a byte set to 0

BOX B0 () void {
    << [0000 0000];
}
```

### Logic

The only default function that this language has is `NAND`. It takes 2 bits (a, b) as inputs and returns `(not (a and b))` as expected. Every other logical operator can be crafted using the `NAND`.

```
Example: The construction of AND

BOX NOT (
    a : bit
) bit {
    << NAND (a, a);
}

BOX AND (
    a : bit,
    b : bit
) bit {
    << NOT (NAND (a, b));
}

$ AND (0, 1); $;
$ AND (1, 1); $;

```

Prints `0` then `1`

### Importing other .bl files

Let "gates.bit"
```

BOX NOT (
    a : bit
) bit {
    << NAND (a, a);
}

BOX AND (
    a : bit,
    b : bit
) bit {
    << NOT (NAND (a, b));
}

BOX OR (
    a : bit,
    b : bit
) bit {
    << NAND (NOT (a), NOT (b));
}
```

be a util function file.


```
IMPORT "gates.bl";

$ AND (1, 0);
$ OR  (1, 0);
```

Prints "01"
