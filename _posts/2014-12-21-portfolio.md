---
layout: post
title:  Portfolio
---

<div class="row">
    {% for item in site.data.projects.projlist %}
        <div class="col-lg-4 col-sm-6 col-xs-12">
            <div class="project-item">
                <div class="col-md-12 project-title">
                    <strong>{{ item[1].title }}</strong>
                </div>
                <div class="col-md-12 project-tag">
                    <small>{{ item[1].tag }}</small>
                </div>
                <div class="col-md-12 project-descr">
                    {{ item[1].descr }}
                </div>
                <div class="col-md-12 project-link">
                    <a href="{{ item[1].url }}" class="btn btn-primary btn-large btn-block">View Project Page</a>
                </div>
            </div>
        </div>
    {% endfor %}
</div>