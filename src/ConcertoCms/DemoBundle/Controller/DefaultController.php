<?php

namespace ConcertoCms\DemoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;

class DefaultController extends Controller
{
    public function splashAction()
    {
        $cm = $this->get('concerto_cms_core.content');
        $route = $cm->getRoute("/en");
        $router = $this->get('router');
        $uri = $router->generate($route);
        return new RedirectResponse($uri, 301);
    }

    public function pageAction($contentDocument)
    {
        return $this->render('ConcertoCmsDemoBundle:Default:index.html.twig', array('document' => $contentDocument));
    }
}
