# Quale - Project 3
KNOWN BUGS:

Rendering/GraphQL issue: When entering a public convo, then opening a private convo with someone from that convo, when you go back into the same public convo, that user's username that was previously clicked, doesn't render; probably due to the previous graphQL request not existing so it has nothing to render.

When entering a private convo (maybe also public?) and there's no comments to pull, and you make a comment, it won't render the comment in the chat log.  It must be refreshed to render, after the initial refresh the chatlog behaves as normal.  This will be due to the else statement needing a conditional to check if the chatlog has been updated.

Not a visual bug yet:  Need to make the account/about page not a table; as react seems to have issues with table elements as I have it now.

IF too many emails have been sent, Outlook will bar emails from sending for a period.  I can't control this.  If there are issues activating the account, it is for this reason.  Normal behaviour can be seen in the walkthrough video provided.  You can use these pre-made credentials:
Username: xxx
Password: xxx

TODO:
STYLING  - tue / wed
ON SIGN ON STATES tue
FORUM - FRIENDS ONLY now

PASSWORD HASHING- wednesday
PRESENTATION & DOCUMENTATION - wednesday
IF TIME: AVATAR