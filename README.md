# Quale - Project 3
KNOWN BUGS:

Rendering/GraphQL issue: When entering a public convo, then opening a private convo with someone from that convo, when you go back into the same public convo, that user's username that was previously clicked, doesn't render; probably due to the previous graphQL request not existing so it has nothing to render.

When entering a private convo (maybe also public?) and there's no comments to pull, and you make a comment, it won't render the comment in the chat log.  It must be refreshed to render, after the initial refresh the chatlog behaves as normal.  This will be due to the else statement needing a conditional to check if the chatlog has been updated.

Not a visual bug yet:  Need to make the account/about page not a table; as react seems to have issues with table elements as I have it now.

IF too many emails have been sent, Outlook will bar emails from sending for a period.  I can't control this.  If there are issues activating the account, it is for this reason.  Normal behaviour can be seen in the walkthrough video provided.  You can use these pre-made credentials:
Username: ananfro
Password: ananfro123

TODO:
STYLING  - tue / wed

PASSWORD HASHING- wednesday
PRESENTATION & DOCUMENTATION - wednesday

What would I change if I was to do it again?
I would use context and reducers for my modal useStates as currently I'm just passing these props through my whole application.
A lot of my bugs are likely due to the way React rerenders, so I would store more values in useStates

Extra features for future?
Avatars that a user can upload to if I can integrate with an FTP server.
Friend requests instead of instantly adding someone
2001 Style Forum where posts are visible by friends
Admin & User priviliges so admins can force ban users, posts, etc.