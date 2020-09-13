# Strike through / delete

## Balanced

a ~one~ b

a ~~two~~ b

a ~~~three~~~ b

a ~~~~four~~~~ b

## Unbalanced

a ~one/two~~ b

a ~one/three~~~ b

a ~one/four~~~~ b

***

a ~~two/one~ b

a ~~two/three~~~ b

a ~~two/four~~~~ b

***

a ~~~three/one~ b

a ~~~three/two~~ b

a ~~~three/four~~~~ b

***

a ~~~~four/one~ b

a ~~~~four/two~~ b

a ~~~~four/three~~~ b

## Multiple

a ~one b one~ c one~ d

a ~one b two~~ c one~ d

a ~one b one~ c two~~ d

a ~~two b two~~ c two~~ d

a ~~two b one~ c two~~ d

a ~~two b two~~ c one~ d

## Flanking

a oneRight~ b oneRight~ c oneRight~ d

a oneRight~ b oneRight~ c ~oneLeft d

a oneRight~ b ~oneLeft c oneRight~ d

a ~oneLeft b oneRight~ c oneRight~ d

a ~oneLeft b oneRight~ c ~oneLeft d

a ~oneLeft b ~oneLeft c oneRight~ d

a ~oneLeft b ~oneLeft c ~oneLeft d

***

a twoRight~~ b twoRight~~ c twoRight~~ d

a twoRight~~ b twoRight~~ c ~~twoLeft d

a twoRight~~ b ~~twoLeft c twoRight~~ d

a ~~twoLeft b twoRight~~ c twoRight~~ d

a ~~twoLeft b twoRight~~ c ~~twoLeft d

a ~~twoLeft b ~~twoLeft c twoRight~~ d

a ~~twoLeft b ~~twoLeft c ~~twoLeft d

## Interleave with attention

a ~~two *emphasis* two~~ b

a ~~two **strong** two~~ b

a *marker ~~two marker* two~~ b

a ~~two *marker two~~ marker* b

## Interleave with links

a ~~two [resource](#) two~~ b

a ~~two [reference][#] two~~ b

a [label start ~~two label end](#) two~~ b

a ~~two [label start two~~ label end](#) b

a ~~two [label start ~one one~ label end](#) two~~ b

a ~one [label start ~~two two~~ label end](#) one~ b

a ~one [label start ~one one~ label end](#) one~ b

a ~~two [label start ~~two two~~ label end](#) two~~ b

[#]: #

## Interleave with code (text)

a ~~two `code` two~~ b

a ~~two `code two~~` b

a `code start ~~two code end` two~~ b

a ~~two `code start two~~ code end` b

a ~~two `code start ~one one~ code end` two~~ b

a ~one `code start ~~two two~~ code end` one~ b

a ~one `code start ~one one~ code end` one~ b

a ~~two `code start ~~two two~~ code end` two~~ b
