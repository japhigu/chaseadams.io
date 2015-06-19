---
title: Deploy Code with Git Push and a Post Receive Hook
date: 2014-01-22T02:47:00Z
slug: 2014/01/deploy-code-with-git-push-and-a-post-receive-hook
---

<p>This is a handy trick for pushing your code and deploying it with the same command.</p>

<p>In your git repo on your remote server there's a directory called <em><code>hooks</code></em>. Create a new file in hooks called <em><code>post-receive</code></em> and set it as an executable by running <strong><code>chmod +x post-receive</code></strong>.</p>

<p>Now open post-receive and insert the following code:</p>

<p><script src="https://gist.github.com/realchaseadams/8499671.js"></script> A few things to note:</p>

<ul>
<li><p><strong><code>$RCA_THEME_PATH</code></strong> is an environment variable set to the absolute path to where I want my repo to checkout the code.</p></li>
<li><p><strong>The file has to be modified to be executable.</strong> If you don't do this, you're going to be banging your head against your keyboard until you realize you need to.</p></li>
</ul>

<p>Now, once you've added your updated code and committed it, when you run <strong><code>git push origin master</code></strong> (replace <em>origin</em> with your remote name), you'll see your code change on your remote server.</p>

<h3>Issues with this technique</h3>

<p>For the most part, this technique is a pretty good solution for pushing code and deploying it at the same time. One major drawback is that you have to version control your distribution directory (the compiled code for your js, css and templates), which is not generally considered a good practice.</p>
