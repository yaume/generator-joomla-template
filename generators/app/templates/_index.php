<?php
	defined('_JEXEC') or die;
	require_once(JPATH_THEMES.'/'.$this->template.'/html/logic.php');
?>
<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
	<head>
		<meta charset="utf-8">
		<jdoc:include type="head" />
	</head>
	<body<?php echo $bodyClass; ?>>
	
		<div class="container">

			<div class="row">
				<div class="column-12">
					<?php echo JText::_('TPL_<%= tpl_name_upper %>_BACKGROUND_COLOR_LABEL'); ?>: <?php echo $params->get('background_color'); ?>
				</div>
			</div>
			
			<?php if ($this->countModules('top')) : ?>
			<div class="row">
				<div id="modules-top" class="column-12">
					<jdoc:include type="modules" name="top" style="none" />
				</div>
			</div>
			<?php endif; ?>
			
			<?php if($this->countModules('top')) : ?>
			<div class="row">
				<div id="modules-top" class="column-12">
					<jdoc:include type="modules" name="top" style="none" />
				</div>
			</div>
			<?php endif; ?>
				
			<div class="row">
				<?php if($this->countModules('position-8')) : ?>
				<div id="column-left" class="column-3">
					<jdoc:include type="modules" name="position-8" style="html5" />
				</div>
				<?php endif; ?>
				
				<div id="column-middle" class="<?php echo $columnMiddle; ?>">
					<jdoc:include type="component" />
				</div>
				
				<?php if($this->countModules('position-7')) : ?>
				<div id="column-right" class="column-3">
					<jdoc:include type="modules" name="position-7" style="html5" />
				</div>
				<?php endif; ?>
			</div>
				
			<div class="row">
				<?php if($this->countModules('bottom')) : ?>
				<div id="modules-bottom" class="column-12">
					<jdoc:include type="modules" name="bottom" style="html5" />
				</div>
				<?php endif; ?>
			</div>

		</div>
		
		<jdoc:include type="modules" name="debug" />
		
	</body>
</html>