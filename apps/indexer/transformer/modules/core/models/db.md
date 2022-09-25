-   Post
-   Profile
-   Account
-   PostInteraction
-   Pool

```
Profile
    - id                PK
    - username          NN/Unique
    - bio               ?   long text
    - avatarUrl         ?   url
    - joinedOn          NN
    - walletAddress     NN/Unique
```

```
Beneficiary
    - beneficiary       PK  address
    - primary           PK  address
    - claimStarted      NN  bool
    - claimDate         ?   timestamp
    - releaseDate       ?   timestamp
```

```
RUSD Account
    - owner             PK  address
    - balance           NN  number
    - isLocked          ?   bool
```

```
RUSD Account Beneficiary
    - primary           PK  RusdAccount.owner
    - beneficiary       NN  address
    - claimPlaced       ?   bool
    - releaseDate       ?   timestamp
```

```
RUSD Account Action
    - id            PK  uuid
    - date          NN  timestamp
    - accountOwner  NN  RusdAccount.owner
    - action        NN  'withdraw' | 'deposit' | 'beneficiaryClaim' | 'beneficiaryCancel' | 'beneficiaryWithdraw'
    - by            NN  address
    - amount        ?   number
```

```
Subscription Plan
    - id                PK uuid
    - primary           NN RusdAccount.owner
    - startTime         NN Timestamp
```

```
Subscription
    - plan              PK  subscriptionPlan.id
    - subscriber        PK  address
    - amount            NN  number

```

// Article and Image post should be same table

```
ImagePost
    - id            PK
    - creator       NN profile.id
    - title         NN
    - createdAt     NN
    - description
    - width
    - height
    - ipfsCid       NN
    - ipfsImagePath NN
    - tags
    - location
```

```
ArticlePost
    - id            PK
    - creator       NN profile.id
    - title         NN
    - createdAt     NN
    - tags
    - location
    - coverImageId  imagePost.id
    - body          NN
```

```
PostInteraction
    - postId            PK post.id
    - creator           PK profile.id
    - interactionType   NN
```

```
License
    - id            PK
    - postId        NN post.id
    - ownerAddress  NN profile.id
    - purchasePrice NN
    - date          NN
```

```
Pool
    - id            PK
    - creator       NN profile.id
    - goal          NN
    - totalPledged  NN
    - title         NN
    - summary       NN
    - coverCid
    - coverPath
    - startAt       NN
    - endAt         NN
    - claimed       NN
```

```
PoolPledge
    - poolId        PK
    - pledger       PK
    - amount        NN
    - lastPledged   NN
```
