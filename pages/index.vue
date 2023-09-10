<template>
    <div class="mColumnHeader">
        <p>Getting Started</p>
    </div>
    <div>
        <a class="gsLink" href="/local">
            Local Timeline
        </a>
        <a class="gsLink" href="/federated">
            Federated Timeline
        </a>
        <a class="gsLink" href="/trending">
            Trending
        </a>
        <a class="gsLink" href="/pms">
            Private Mentions
        </a>
        <a class="gsLink" href="/bookmarks">
            Bookmarks
        </a>
        <a class="gsLink" href="/favorites">
            Favorites
        </a>
        <a class="gsLink" href="/getting-started/more">
            More
        </a>
    </div>
</template>

<style>
.gsLink {
    display: block;

    margin: 10px;
    padding: 15px 20px 15px 20px;

    color: var(--txt2);
    text-decoration: none;

    border-radius: 10px;
}

.gsLink:hover {
    color: var(--txt1);
    background-color: var(--bg3);
}
</style>