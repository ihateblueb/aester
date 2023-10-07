# Aster
Aster is a Mastodon client (and should work seamlessly with GoToSocial. In the future I also want to support Firefish) that I'm working on. I intend on focusing on features that typical clients lack (such as Glitch and Chuckya specific feature support) and making the general look and layout different from the vanilla or glitch default clients. 
 
Aster is BETA SOFTWARE. There's a lot of missing features, broken parts, and lacking accessibility. It's unusable as a main client as of right now. There's a lot of cases in where content warnings aren't shown, sensitive media isnt censored, or certain interactions breaking. 
 
**Current Production Status: WORKS KINDA!**

## What's going on?
 
Here's what is already working is more so used when a huge part of the feature is done. Here's what I'm currently doing is used for when the start of the feature is mostly done, and more is coming along.

Here's an overview of what I want to do:
- [ ] Support Glitch and Chuckya Mastodon instances
    - [ ] Support Chuckya reactions
        - [x] Reactions show on posts (both unicode and custom emojis, including non-local)
        - [x] Reaction notifications work
        - [ ] Add reactions to posts
            - [ ] Add a reaction someone else has already added
            - [ ] Pick your own reaction to add
- [ ] Support other fedi software
- [ ] Support viewing multiple types of quote posts
    - [ ] Common type (eg. "\[link\]")
    - [ ] Firefish type (eg. "RE: \[link\]")
- [ ] Support making quote posts
- [ ] Premade themes and color schemes
  
Here's what I'm currently doing:
- Profile Rendering
- Settings Pages (specifically base and color themes)
- Custom Emoji Rendering (total shitshow)

Here's what is already working:
- Home Timeline Rendering\*
- Profile Rendering\*
- Notification Timeline Rendering\*\*
 
\* Home Timeline & Profile Rendering: Media rendering isn't that great right now, and content warnings frequently break with boosted posts.  
\*\* Notification Timeline Rendering: There's no "unread" indicators.

## Bugs

I personally use the issues tab to keep track of problems, without the little number there I'll forget. That's why some of the things in there by me are kind of written poorly or make no sense. Feel free to add a comment or open your own if you find something that's broken.
 
## Other Stuff
I've never really made something like this that's so complex, so it might be kind of a mess towards the start and on early versions. If you think something should be added or have a feature that you frequently see neglected by alternative clients, let me know on fedi (@ihateblueb@wetdry.world) or discord (@ihateblueb). I also post a lot about the development of this, so if you'd like to see that you can check it out there on fedi.
