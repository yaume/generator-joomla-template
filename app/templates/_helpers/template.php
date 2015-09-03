<?php

defined('_JEXEC') or die;

class Template {
	
	private $document;
	
	function __construct(JDocumentHTML $document)
	{
		$this->document = $document;
		$this->clearMeta();
		$this->setMeta();
	}
	
	
	public function setMeta()
	{
		$app 	= JFactory::getApplication();
		$doc 	= JFactory::getDocument();
		
		$doc->setMetadata('X-UA-Compatible', 'IE=edge,chrome=1', true);
		$doc->setMetadata('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
		
		// Set global title (without page title) only if frontpage
		if( $this->isFrontpage() ) {
			$doc->setTitle( $app->get('sitename') );
		}
	}
	
	
	public function clearMeta()
	{
		$this->document->setGenerator(null);
		unset($this->document->_metaTags['standard']['xreference']);
		unset($this->document->_metaTags['http-equiv']['content-type']);
		unset($this->document->_metaTags['standard']['author']);
	}
	
	
	public function isFrontpage()
	{
		$app 	= JFactory::getApplication();
		$lang	= JFactory::getLanguage();
		$menu	= $app->getMenu();
		return $menu->getActive() == $menu->getDefault($lang->getTag());
	}
	
	
	public function getBodyClass()
	{
		$app		= JFactory::getApplication();
		$option		= $app->input->getCmd('option', '');
		$view		= $app->input->getCmd('view', '');
		$layout		= $app->input->getCmd('layout', '');
		$task		= $app->input->getCmd('task', '');
		$itemid		= $app->input->getCmd('Itemid', '');
		$params		= $app->getParams();
		$pageClass	= $params->get('pageclass_sfx');
		
		$bodyClass  = '';
		$bodyClass .= $this->isFrontpage()	? ' frontpage'					: ' no-frontpage';
		$bodyClass .= ($option				? ' option-'	. $option		: ' no-option');
		$bodyClass .= ($view				? ' view-'		. $view			: ' no-view');
		$bodyClass .= ($layout				? ' layout-'	. $layout		: ' no-layout');
		$bodyClass .= ($task				? ' task-'		. $task			: ' no-task');
		$bodyClass .= ($itemid				? ' itemid-'	. $itemid		: ' no-itemid');
		$bodyClass .= ($pageClass			? ' '			. $pageClass	: ' no-pageclass');
		
		return ' class="'.trim($bodyClass).'"';
	}
	
}	